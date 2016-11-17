'use strict';

const h = 350;
const w = 400;

let dataList = [
  {'month': 1, "sales": 105},
  {'month': 2, "sales": 130},
  {'month': 3, "sales": 230},
  {'month': 4, "sales": 125},
  {'month': 5, "sales": 150},
  {'month': 6, "sales": 205},
  {'month': 7, "sales": 220},
  {'month': 8, "sales": 210},
  {'month': 9, "sales": 115},
  {'month': 10, "sales": 120},
  {'month': 11, "sales": 295},
  {'month': 12, "sales": 230},
];


// Function that determines color of data dots
const kpiIndicator = (d) => {
  if (d >= 200) {
    return 'red';
  } else if (d < 200) {
    return 'grey'
  }
}


// Function that determines which labels should be shown
// Receives in dataSet, what col should be labeled, current value,
// and type of labels that should be shown
const showMinMax = (ds, col, val, type) => {
  let max = d3.max(ds, (d) => d[col]);
  let min = d3.min(ds, (d) => d[col]);

  if (type === 'minmax' && (val === min || val === max)) {
    return val;
  } else {
    if (type === 'all') {
      return val;
    }
  }
};


const svg = d3.select('body').append('svg')
  .attr({
    width: w,
    height: h
  });


// Add dots to scatter plot
const dots = svg.selectAll('circle')
  .data(dataList)
  .enter()
  .append('circle')
  .attr({
    cx: (d) => d.month * 25,
    cy: (d) => h - d.sales,
    r: 5,
    'fill': (d) => kpiIndicator(d.sales)
  });


// Create Labels
const labels = svg.selectAll('text')
  .data(dataList)
  .enter()
  .append('text')
  .text((d) => showMinMax(dataList, 'sales', d.sales, 'all'))
  .attr({
    x: (d) => (d.month * 24),
    y: (d) => (h - d.sales) - 8,
    'font-size': '12px',
    'font-family': 'sans-serif',
    'fill': 'grey',
    'text-anchor': 'start'
  });
