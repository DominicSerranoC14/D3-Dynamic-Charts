'use strict';

const body = d3.select('body');
/////////////////////////////////////////


// Simple rectangle with d3
body.append('svg')
  .append('rect')
    .attr('width', 50)
    .attr('height', 200)
    .style('fill', 'blue');


// Circle with D3
body.append('svg')
    .attr('width', 50)
    .attr('height', 50)
  .append('circle')
    .attr('cx', 25) // Position in SVG element on x axis
    .attr('cy', 25) // Position in SVG element on y axis
    .attr('r', 25) // Radius of circle
    .style('fill', 'red');


// Text with D3
body.append('svg')
    .attr('width', 250)
    .attr('height', 100)
    .append('text')
      .text('Hello!')
      .attr('x', 100) // Set x coordinates
      .attr('y', 50) // Set y coordinates
      .style('fill', 'orange');
