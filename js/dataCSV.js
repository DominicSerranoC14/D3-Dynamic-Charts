'use strict';

const w = 600;
const h = 400;
let ds;
let sum = null;
let average = null;
let metrics = [];
/////////////////////////////////////////


const buildLine = () => {
  // Function for drawing line graph
  const drawLine = d3.svg.line()
    .x((d) => d.month * 40)
    .y((d) => h - d.sales)
    .interpolate('linear');

  const svg = d3.select('body').append('svg')
    .attr({
      width: w,
      height: h
    });

  const viz = svg.append('path')
    .attr({
      d: drawLine(ds),
      'stroke': 'purple',
      'stroke-width': 2,
      'fill': 'none'
    });
};


// Build a table of the sales totals
const showTotals = () => {

  const table = d3.select('body').append('table');
  let sales = [];

  // Add each sales amount up for sales total
  ds.forEach((each) => {
    sales.push(parseInt(each.sales));
    sum = sales.reduce((a, b) => a + b);
  });

  // Calculate sales average
  average = sum / ds.length;
  // Push sales total and avg to array
  metrics.push(`Sales Total: ${sum}`);
  metrics.push(`Sales Average: ${average.toFixed(2)}`)

  // Show table with sales total
  const tr = table.selectAll('tr')
    .data(metrics)
    .enter()
    .append('tr')
    .append('td')
    .text((d) => d);

};


// Retrieve the CSV file with this d3 method
// This method is async
d3.csv('./js/dataList.csv', (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Data received");
    ds = data;
  }

  // Execute the d3 line function
  buildLine();
  // Build salesTotal table
  showTotals();

});
