from django.urls import path
from .api import (
    SeriesSummaryView,
    SeriesRollingVol,
    SeriesIndexSeries,
    SeriesCalendarReturn,
)

urlpatterns = [
    path("api/analyze/series_summary", SeriesSummaryView.as_view()),
    path("api/analyze/series_rolling_vol", SeriesRollingVol.as_view()),
    path("api/analyze/series_index_series", SeriesIndexSeries.as_view()),
    path("api/analyze/series_calendar_return", SeriesCalendarReturn.as_view()),
]
