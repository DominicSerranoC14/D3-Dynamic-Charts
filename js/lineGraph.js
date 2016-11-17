'use strict';

const h = 350;
const w = 400;

let dataList = [
  {'month': 1, "sales": 105},
  {'month': 2, "sales": 110},
  {'month': 3, "sales": 115},
  {'month': 4, "sales": 120},
  {'month': 5, "sales": 125},
  {'month': 6, "sales": 130},
  {'month': 7, "sales": 205},
  {'month': 8, "sales": 210},
  {'month': 9, "sales": 215},
  {'month': 10, "sales": 220},
  {'month': 11, "sales": 225},
  {'month': 12, "sales": 230},
];


// Linear line drawing function
const drawLine = d3.svg.line()
  // Adjust the multplied value to spread the graph
  .x((d) => d.month * 30)
  // Subtract from the height to invert graph from 0 to highest val
  .y((d) => h - d.sales)
  .interpolate('linear')


// Base svg element
const svg = d3.select('body').append('svg')
  .attr('width', w).attr('height', h);


// Viz = visualization
// Path svg, the actual line graph
const viz = svg.append('path')
  .attr({
    d: drawLine(dataList),
    'stroke': 'purple',
    'stroke-width': 2,
    'fill': 'none'
  })


// Label for the line graph
const label = svg.selectAll('svg')
  .data(dataList)
  .enter()
  .append('text')
  .text((d) => d.sales)
  .attr({
    // Adjusting x coor to give space between line and label
    x: (d) => (d.month * 30) - 20,
    // Adjusting y coor to raise label slightly above line
    y: (d) => h - d.sales - 8,
    'font-size': '12px',
    'font-family': 'sans-serif',
    'text-anchor': 'start',
    'dy': '.35em',
    // Determining start and endpoint of the line
    'font-weight': (d, i) => i === 0 || i === dataList.length - 1 ? 'bold': 'normal'
  });
