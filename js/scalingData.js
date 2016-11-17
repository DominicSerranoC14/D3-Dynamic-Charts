'use strict';

const w = 600;
const h = 400;
let ds;
let metrics = [];
/////////////////////////////////////////


const buildLine = (ds) => {

  // Function for x-axis scaling
  const xScale = d3.scale.linear()
    .domain([
      // Determine min and max values of x axis
      d3.min(ds.monthlySales, (d) => d.month),
      d3.max(ds.monthlySales, (d) => d.month)
    ])
    // Range is from 0 to svg width
    .range([0, w]);

  // Function for y-axis scaling
  const yScale = d3.scale.linear()
    .domain([ 0, d3.max(ds.monthlySales, (d) => d.sales) ])
    .range([h, 0]);

  // Function for drawing line graph
  const drawLine = d3.svg.line()
    .x((d) => xScale(d.month))
    .y((d) => yScale(d.sales))
    .interpolate('linear');

  const svg = d3.select('body').append('svg')
    .attr({
      width: w,
      height: h
    });

  const viz = svg.append('path')
    .attr({
      d: drawLine(ds.monthlySales),
      'stroke': 'purple',
      'stroke-width': 2,
      'fill': 'none'
    });
};


const showHeader = (ds) => {
  d3.select('body').append('h1')
    .text(`${ds.category} Sales 2016`)
};


d3.json('./js/dataList.json', (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Data received");
    // Loop through each collection in the json file
    data.collection.forEach((ds) => {
      // Execute the header d3 line function
      showHeader(ds);
      buildLine(ds);
    });
  };
});
