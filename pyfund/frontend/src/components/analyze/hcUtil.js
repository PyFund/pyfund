import React from "react";

export const hcPercentTooltip = (decimals = 0) => {
  return {
    pointFormatter: function () {
      return (
        '<span style="color:' +
        this.color +
        '">' +
        this.series.name +
        "</span>: <b>" +
        (this.y * 100).toFixed(decimals) +
        "%</b>"
      );
    },
    split: true,
  };
};

export const hcPercentYAxis = (decimals = 0) => {
  return {
    labels: {
      formatter: function () {
        return (
          (this.value > 0 ? " + " : "") +
          (this.value * 100).toFixed(decimals) +
          "%"
        );
      },
    },
    plotLines: [
      {
        value: 0,
        width: 2,
        color: "silver",
      },
    ],
  };
};

export const hcPercentSeriesConfig = (decimals = 0) => {
  return {
    yAxis: hcPercentYAxis(decimals),
    tooltip: hcPercentTooltip(decimals),
    series: [],
    chart: { height: (2 / 3) * 100 + "%" },
    plotOptions: { series: { animation: { duration: 300 } } },
    navigator: { enabled: false },
    scrollbar: { enabled: false },
    credits: { enabled: false },
  };
};
