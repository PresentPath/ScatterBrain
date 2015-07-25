/* 
* @Author: Katrina Uychaco
* @Date:   2015-07-22 19:57:55
* @Last Modified by:   Katrina Uychaco
* @Last Modified time: 2015-07-24 20:10:03
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
  svg.append('text').attr('class', 'netNum').text('Net Number '+(i+1)).attr('y', '600');
  svg.append('text').text('Iterations: ').attr('y', '620').attr('class', 'numIterations');
  svg.append('text').text('Error: ').attr('y', '640').attr('class', 'error');
  svgs.push(svg);
}

// Visualize initial state of neural net
var visualize = function(networkNum, nodePositions, linksSource) {
  //console.log('LINKS',links);

  var nodes = svgs[networkNum-1].select('g').selectAll('circle');
  var links = svgs[networkNum-1].select('g').selectAll('path');

  // Create new links
  var linksEnter = links.data(linksSource).enter();

  linksEnter.append('path')
    .attr('class', 'link')
    .attr('d', function(d) {
      //console.log(d);
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
  svgs[netNum-1].select('.numIterations').text(result.iterations);
  //console.log(typeof result.error, '@@@@@@@@@@@@@')
  svgs[netNum-1].select('.error').text(Math.round(1000*result.error)/1000);
};