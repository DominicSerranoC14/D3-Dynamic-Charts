'use strict';

const w = 800;
const h = 400;

const projection = d3.geo.albersUsa()
  .translate([w/2, h/2])
  .scale([500])

const path = d3.geo.path().projection(projection);

const svg = d3.select('body').append('svg').attr({ width: w, height: h});

d3.json('https://raw.githubusercontent.com/alignedleft/d3-book/master/chapter_12/us-states.json', (json) => {

  svg.selectAll('path')
    .data(json.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr({
      'fill': 'grey'
    })

})
