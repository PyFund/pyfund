from django.http import HttpResponse, Http404, JsonResponse
from upload.models import PublicFile
from pyform import ReturnSeries, CashSeries
from pyform.analysis import table_calendar_return
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

        # Load all objects
        files = PublicFile.objects.all()

        # Filter by request
        pk = request.query_params.get("id", None)
        freq = request.query_params.get("freq", "M")
        window = int(request.query_params.get("window", 36))
        bm = request.query_params.get("bm", None)

        if pk is not None:
            series_files = files.filter(pk=pk)

        # Perform operation on the filter result
        if len(series_files) == 1:

            # Select file to use, load it into Return Series
            file = series_files[0]
            series = ReturnSeries.read_csv(file.file)

            # Set series name. Default behavior without this is to use
            # the column name
            series.name = file.seriesName

            if bm is not None:
                bm = bm.split(",")
                bm_files = files.filter(pk__in=bm)

                for bm_file in bm_files:

                    bm_series = ReturnSeries.read_csv(bm_file.file)
                    bm_series.name = bm_file.seriesName
                    series.add_bm(bm_series, bm_file.seriesName)

            # Create results
            result = series.get_rolling_ann_vol(freq=freq, window=window)

            output = []
            for name, series in result.items():

                series.index = to_js_time(series.index)
                series = series.reset_index()
                series = series.to_json(orient="values")
                output.append({"name": name, "data": series})

            return JsonResponse(output, safe=False)

        elif len(series_files) > 1:
            raise Http404

        else:
            raise Http404


class SeriesIndexSeries(APIView):
    def get(self, request, *args, **kwargs):

        # Load all objects
        files = PublicFile.objects.all()

        # Filter by request
        pk = request.query_params.get("id", None)
        freq = request.query_params.get("freq", "D")
        bm = request.query_params.get("bm", None)

        if pk is not None:
            series_files = files.filter(pk=pk)

        # Perform operation on the filter result
        if len(series_files) == 1:

            # Select file to use, load it into Return Series
            file = series_files[0]
            series = ReturnSeries.read_csv(file.file)

            # Set series name. Default behavior without this is to use
            # the column name
            series.name = file.seriesName

            if bm is not None:
                bm = bm.split(",")
                bm_files = files.filter(pk__in=bm)

                for bm_file in bm_files:

                    bm_series = ReturnSeries.read_csv(bm_file.file)
                    bm_series.name = bm_file.seriesName
                    series.add_bm(bm_series, bm_file.seriesName)

            # Create results
            result = series.get_index_series(freq=freq)

            output = []
            for name, series in result.items():

                series.index = to_js_time(series.index)
                series = series.reset_index()
                series = series.to_json(orient="values")
                output.append({"name": name, "data": series})

            return JsonResponse(output, safe=False)

        elif len(series_files) > 1:
            raise Http404

        else:
            raise Http404


class SeriesCalendarReturn(APIView):
    def get(self, request, *args, **kwargs):

        files = PublicFile.objects.all()
        pk = request.query_params.get("id", None)

        if pk is not None:
            series_files = files.filter(pk=pk)

        output = []
        if len(series_files) == 1:

            file = series_files[0]
            series = ReturnSeries.read_csv(file.file)
            series.name = file.seriesName
            result = table_calendar_return(series)
            result = result.to_json(orient="records")
            output.append({"name": series.name, "data": result})

            return JsonResponse(output, safe=False)

        elif len(series_files) > 1:
            raise Http404

        else:
            raise Http404

