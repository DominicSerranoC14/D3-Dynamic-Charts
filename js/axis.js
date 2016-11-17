'use strict';

const w = 300;
const h = 200;
const padding = 35;
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
    .range([padding + 5, w - padding])
    .nice();

  // Function for y-axis scaling
  const yScale = d3.scale.linear()
    .domain([0, d3.max(ds.monthlySales, (d) => d.sales)])
    .range([h - padding, 10])
    .nice();

  // Create y-axis and x-axis
  const yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(5);
  const xAxisGen = d3.svg.axis().scale(xScale).orient('bottom');

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

  // Append y axis to svg
  const yAxis = svg.append('g').call(yAxisGen)
    .attr('class', 'axis')
    .attr('transform', `translate(${padding}, 0)`);

  // Append x axis to svg
  const xAxis = svg.append('g').call(xAxisGen)
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${h - padding})`);

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
