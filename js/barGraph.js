'use strict';

const w = 300;
const h = 300;
const p = 2;
const list = [5, 10, 15, 20, 25, 30, 35];
const svg = d3.select('body').append('svg').attr('width', w).attr('height', h);
/////////////////////////////////////////


// Each bar coordinates, height and width
svg.selectAll('rect')
  .data(list)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * (w / list.length))
  .attr('y',(d) => (h - 14) - (d * 4))
  .attr('height', (d) => d * 4)
  .attr('width', w / list.length - p)
  // Dynamically create rgb values from the dataset
  .style('fill', (d) => `rgb(${d * 6}, 0, 0)`);


// Labels for each bar in graph
svg.selectAll('text')
  .data(list)
  .enter()
  .append('text')
  .text((d) => d)
  .attr('text-anchor', 'middle')
  // Adjust label for bar considering padding
  .attr('x', (d, i) => i * (w / list.length) + (w / list.length - p) / 2)
  // Adjust the y coor of the label considering font size
  .attr('y', (d) => (h - 14) - (d * 4) + 14)
  .attr('fill', 'white')
  .attr('font-family', 'sans-serif')


// Label for x-axis
svg.append('text')
  .text('Amount')
  .attr('x', 140)
  .attr('y', h)
  .attr('font-family', 'sans-serif')
