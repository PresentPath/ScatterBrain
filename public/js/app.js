/* 
* @Author: Katrina Uychaco
* @Date:   2015-07-21 16:54:34
* @Last Modified by:   Katrina Uychaco
* @Last Modified time: 2015-07-21 18:18:46
*/

'use strict';

// EventEmitter-like object
var socket = io();
socket.on('connect', function() {
  console.log('connection!');
});
socket.on('brain', function(result) {
  // Update paths between nodes when new weights are provided
  // console.log('#############\n ', result.iterations, '\n', result.error, '\n', result.brain);
  
});

$(document).ready(function() {
  $('form').submit(function(e) {
    
    e.preventDefault();

    var formDataString = '[[' + $('#hiddenLayers1').val() + '],[' + $('#hiddenLayers2').val() + '],[' + $('#hiddenLayers3').val() + '],[' + $('#hiddenLayers4').val() + ']]';

    var formData = {
      'hiddenLayers': formDataString
    };

    console.log('formData:', formData);
    
    // Render nodes for neural network architecture
    drawNetworks(formData);

    socket.emit('train', formData);
    $('#hiddenLayers').val('');
    console.log('train brains!');

  });

});

// Options to control display of networks
var displayOptions = {
  width: 960,
  height: 640,
  verticalOffset: 160,
  margin: 20
};

// Render a network of nodes for neural network
var drawNetworks = function() {
  // Parse the values in the input forms to get the array of nodes for each network
  // Add elements for nodes in input layer and output layer
  var network1NodeList = [2].concat($('#hiddenLayers1').val().split(',').map(Number),[0]);
  // Add one to each layer to account for bias nodes
  network1NodeList = network1NodeList.map(function(elem){
    return elem + 1;
  });
  console.log(network1NodeList);
  
  var separation = ((displayOptions.width/4) - (2 * displayOptions.margin)) / (network1NodeList.length-1);
  console.log('horizontal separation:', separation);

  // Calculate the x-coordinates for each layer in network 1
  var network1XCoordinates = [];
  
  network1NodeList.forEach(function(elem, index) {
    var xCoordinate = Math.round((index * separation) + displayOptions.margin);
    network1XCoordinates.push(xCoordinate);
  });

  console.log(network1XCoordinates);

  // Calculate the y-coordinates for each layer in network 1
  var network1YCoordinates = [];
  
  network1NodeList.forEach(function(elem, index) {
    // Each element represents a layer
    // For each layer use the number of nodes in the layer to determine the separation between each node
    var separation = ((displayOptions.height - (2 * displayOptions.margin)) / Math.max((elem - 1),2));
    console.log('vertical separation:', separation);

    // Generate the y-coordinate for each node in the layer
    var layerYCoordinates = [];
    for(var i = 0; i < elem; i++) {
      if (elem === 1) {
        i = 1;
      }
      var yCoordinate = Math.round((i * separation) + (displayOptions.verticalOffset + displayOptions.margin));
      layerYCoordinates.push(yCoordinate);
    }
    console.log('layer', index+1);
    console.log('y-coordinates for layer', layerYCoordinates);

    network1YCoordinates.push(layerYCoordinates);
  });

  console.log('network1YCoordinates:', network1YCoordinates);

};