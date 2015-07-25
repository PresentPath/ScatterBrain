/* 
* @Author: Katrina Uychaco
* @Date:   2015-07-22 19:57:55
* @Last Modified by:   Katrina Uychaco
* @Last Modified time: 2015-07-24 21:36:16
*/

'use strict';

var width = 960/4,
    height = 640;

var diagonal = d3.svg.diagonal();

var svgs = [];

// Create svg element for each neural net
for (var i=0; i<4; i++){
  var svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height)
    
  svg.append('g');
  svg.append('text').attr('y', '570').attr('class', 'netNum').text('Net Number '+(i+1)).style('font-weight', 'bold');
  svg.append('text').attr('y', '590').attr('class', 'numIterations');
  svg.append('text').attr('y', '610').attr('class', 'error');
  svg.append('text').attr('y', '630').attr('class', 'output');
  svgs.push(svg);
}

// Visualize initial state of neural net
var visualize = function(networkNum, nodePositions, linksSource) {

  var nodes = svgs[networkNum-1].select('g').selectAll('circle');
  var links = svgs[networkNum-1].select('g').selectAll('path');

  // Create new links
  var linksEnter = links.data(linksSource).enter();

  linksEnter.append('path')
    .attr('class', 'link')
    .attr('d', function(d) {
      return diagonal({ source: d.source, target: d.target });
    });

  // Create new nodes
  var nodeEnter = nodes.data(nodePositions).enter();
  
  nodeEnter.append('circle')
    .attr('class', 'node')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', '10');

};

// Update link weights and results
var update = function(result, weights) {
  var netNum = result.networkNum;

  // Update weights
  var maxWeight = Math.max.apply(null, weights);
  var minWeight = Math.min.apply(null, weights);
  var max = Math.max(Math.abs(maxWeight), Math.abs(minWeight));
  var links = svgs[netNum-1].selectAll('path');
  links.style('stroke', function(d, i) {
    var opacity = Math.abs(weights[i])/max;
    return 'rgba(30,30,30,' + opacity + ')';
  });

  // Update results
  svgs[netNum-1].select('.numIterations').text('Iterations: ' + result.iterations);
  svgs[netNum-1].select('.error').text('Error: ' + Math.round(1000*result.error)/1000);
  svgs[netNum-1].select('.output').text('Output: ' + Math.round(100*result.output)/100);
};