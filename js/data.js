'use strict';
const w = 250;
const h = 250;
const p = 2;
const list = [5, 10, 15, 20, 25];
const svg = d3.select('body').append('svg').attr('width', w).attr('height', h);
/////////////////////////////////////////

svg.selectAll('rect')
  .data(list)
  .enter()
  .append('rect')
    // To determine the x coor of each bar, divide the length of the dataset from the width
    .attr('x', (d, i) => i * (w / list.length))
    // Evaluate the y coordinates by subtracting the height from the data value
    // this is because the coordinate system for SVG origin is top left 0,0
    .attr('y',(d) => h - (d * (h / 50)))
    .attr('height', (d) => d * (h / 50))
    // Width is the length of the dataset from the width minus the padding
    .attr('width', w / list.length - p)
    .style('fill', 'tomato');
