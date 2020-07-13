from django.http import HttpResponse, Http404, JsonResponse
from upload.models import PublicFile
from pyform.returnseries import ReturnSeries, CashSeries
from rest_framework.views import APIView
from rest_framework import status
import json
import pandas as pd


def to_js_time(pd_timestamp):
    def to_utc(timestamp):

        try:
            return timestamp.tz_convert("UTC").strftime("%s%f")
        except:
            # No timezone is set. Set timezone to US Eastern first
            return to_utc(timestamp.tz_localize("US/Eastern"))

    if isinstance(pd_timestamp, pd.Timestamp):
        return int(to_utc(pd_timestamp)) / 1000
    elif isinstance(pd_timestamp, pd.DatetimeIndex):
        return to_utc(pd_timestamp).astype(int) / 1000


def to_perc(num, decimals=2):

    return str(round(num * 100, decimals)) + "%"


class SeriesSummaryView(APIView):
    def get(self, request, *args, **kwargs):

        files = PublicFile.objects.all()
        pk = request.query_params.get("id", None)

        pk_params = []
        if pk is not None:
            pk_params = [int(i) for i in pk.split(",")]
            files = files.filter(pk__in=pk_params)

        result = []

        libor = CashSeries.read_fred_libor_1m()

        for file in files:
            series = ReturnSeries.read_csv(file.file)
            series.add_rf(libor, "libor")
            series.name = file.seriesName
            start = series.start
            end = series.end
            ann_ret = series.get_ann_ret()
            ann_vol = series.get_ann_vol()
            sharpe = series.get_sharpe()
            result.append(
                {
                    "name": file.seriesName,
                    "start": to_js_time(start),
                    "end": to_js_time(end),
                    "ann_ret": to_perc(ann_ret.value[0], 1),
                    "ann_vol": to_perc(ann_vol.value[0], 1),
                    "sharpe": round(sharpe.value[0], 2),
                }
            )

        if len(result) > 0:
            return JsonResponse(result, safe=False)
        else:
            raise Http404


class SeriesRollingVol(APIView):
    def get(self, request, *args, **kwargs):

        files = PublicFile.objects.all()
        pk = request.query_params.get("id", None)
        freq = request.query_params.get("freq", "M")
        window = int(request.query_params.get("window", 36))

        if pk is not None:
            files = files.filter(pk=pk)

        if len(files) > 0:
            file = files[0]
            series = ReturnSeries.read_csv(file.file)
            series.name = file.seriesName
            rolling_vol = series.get_rolling_ann_vol(freq=freq, window=window).get(
                file.seriesName
            )
            rolling_vol.index = to_js_time(rolling_vol.index)
            rolling_vol = rolling_vol.reset_index()
            rolling_vol = rolling_vol.to_json(orient="values")
            result = {"name": file.seriesName, "data": rolling_vol}
            return JsonResponse(result, safe=False)
        else:
            raise Http404
