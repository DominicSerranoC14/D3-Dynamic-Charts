'use strict';

const w = 600;
const h = 400;
let ds;
let sum = null;
let average = null;
let metrics = [];
/////////////////////////////////////////


const buildLine = (ds) => {
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


// Retrieve the CSV file with this d3 method
// This method is async
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
