export const priceHistoryOptions = (priceHistory, productName) => {
  return {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Price History',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: `Price (€)`,
      },
      min: 0,
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    series: [
      {
        name: `${productName} price change`,
        data: priceHistory,
      },
    ],
  };
};
export const quantityHistoryOptions = (quantityHistory, productName) => {
  return {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Quantity History',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: `Quantity (pcs)`,
      },
      min: 0,
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    series: [
      {
        name: `${productName} quantity change`,
        data: quantityHistory,
      },
    ],
  };
};
