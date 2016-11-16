'use strict';

const w = 300;
const h = 100;
const p = 2;
const list = [5, 10, 15, 20, 25, 30, 35];
const svg = d3.select('body').append('svg').attr('width', w).attr('height', h);
/////////////////////////////////////////


svg.selectAll('rect')
  .data(list)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * (w / list.length))
  .attr('y',(d) => h - (d * (h / 50)))
  .attr('height', (d) => d * (h / 50))
  .attr('width', w / list.length - p)
  // Dynamically create rgb values from the dataset
  .style('fill', (d) => `rgb(${d * 6}, 0, 0)`);
