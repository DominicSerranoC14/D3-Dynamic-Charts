'use strict';

const w = 400;
const h = 200;
const padding = 35;
let ds;
let metrics = [];
/////////////////////////////////////////


// Dynamically create dropdown menu
const P = document.createElement('p');
P.innerHTML = 'Choose Date Range ';
const select = document.createElement('select');
select.setAttribute('id', 'date-option');
const OOne = document.createElement('option');
OOne.setAttribute('value', '12');
OOne.innerHTML = 'Last Year';
const OTwo = document.createElement('option');
OTwo.setAttribute('value', '6');
OTwo.innerHTML = 'Last 6/mo';
const OThree = document.createElement('option');
OThree.setAttribute('value', '3');
OThree.innerHTML = 'Last Quarter';
document.body.append(P);
P.append(select);
select.append(OOne, OTwo, OThree);



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

  // Function for y-axis scaling
  const yScale = d3.scale.linear()
    .domain([0, d3.max(ds.monthlySales, (d) => d.sales)])
    .range([h - padding, 10])

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
      height: h,
      // Added id for more selective manipulation
      'id': `svg-${ds.category}`
    });

  // Append y axis to svg
  const yAxis = svg.append('g').call(yAxisGen)
    .attr('class', 'y-axis')
    .attr('transform', `translate(${padding}, 0)`);

  // Append x axis to svg
  const xAxis = svg.append('g').call(xAxisGen)
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${h - padding})`);

  const viz = svg.append('path')
    .attr({
      d: drawLine(ds.monthlySales),
      'stroke': 'purple',
      'stroke-width': 2,
      'fill': 'none',
      'class': `path-${ds.category}`
    });
};


const updateLine = (ds) => {

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

  // Select the current svg to update
  const svg = d3.select('body').select(`#svg-${ds.category}`);

  // Append y axis to svg
  const yAxis = svg.selectAll('g.y-axis').call(yAxisGen);
  // Append x axis to svg
  const xAxis = svg.selectAll('g.x-axis').call(xAxisGen);

  const viz = svg.selectAll(`.path-${ds.category}`)
    .attr({
      d: drawLine(ds.monthlySales)
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


// Add event listeners for filter options
d3.select('select')
  .on('change', (d, i) => {
    // On change, get the original data set
    d3.json('./js/dataList.json', (err, data) => {
      if (err) {
        console.log("Error: ", err);
      } else {
        const sel = d3.select('#date-option').node().value;
        // Loop through the ds to update the graphs
        data.collection.forEach((ds) => {
          // Splice the sales array by the filter amount selected
          ds.monthlySales.splice(0, ds.monthlySales.length - sel);
          updateLine(ds);
        });
      };
    });
  });
