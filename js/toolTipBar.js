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
  .attr({
    x: (d, i) => i * (w / list.length),
    y: (d) => (h - 14) - (d * 4),
    height: (d) => d * 4,
    width: w / list.length - p,
    // Dynamically create rgb values from the dataset
    fill: (d) => `rgb(${d * 6}, 0, 0)`
  })
.on('mouseover', (d) => {
  // Show tooltips when there is a bar mouseover
  svg.append('text')
    .text(d)
    .attr({
      'text-anchor': 'middle',
      x: parseFloat(d3.select(event.target).attr('x')) + parseFloat(d3.select(event.target).attr('width') / 2),
      y: parseFloat(d3.select(event.target).attr('y')) + 12,
      'fill': 'white',
      'font-family': 'sans-serif',
      id: 'tooltip'
    })
})
.on('mouseout', (d) => {
  d3.select('#tooltip').remove();
})


// Label for x-axis
svg.append('text')
  .text('Amount')
  .attr('x', 140)
  .attr('y', h)
  .attr('font-family', 'sans-serif')
