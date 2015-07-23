/* 
* @Author: Katrina Uychaco
* @Date:   2015-07-22 19:57:55
* @Last Modified by:   Katrina Uychaco
* @Last Modified time: 2015-07-22 22:15:31
*/

'use strict';

var width = 960/4,
    height = 640;

var svgs = [];

for (var i=0; i<4; i++){
  var svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height)
    .append('g');
  svgs.push(svg);
}

var visualize = function(networkNum, nodePositions, links) {

  var nodes = svgs[networkNum-1].selectAll('circle');
  var links = svgs[networkNum-1].selectAll('path');

  // Create new nodes
  var nodeEnter = nodes.data(nodePositions).enter();
  
  nodeEnter.append('circle')
    .attr('class', 'node')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', '10');


  // Create new links
  var linksEnter = links.data(links).enter();

  linksEnter.append('path')
    .attr('class', 'link')
    .attr('d', function(d) {
      return diagonal({ source: d.source, target: d.target });
    });


};