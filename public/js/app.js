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

// Render a network of nodes for neural network
var drawNetworks = function() {
  // Parse the values in the input forms to get the array of nodes for each network
  // Add element for nodes in input layer and output layer
  var network1NodeList = [2].concat($('#hiddenLayers1').val().split(',').map(Number),[0]);
  // Add one to each layer to account for bias nodes
  network1NodeList = network1NodeList.map(function(elem){
    return elem + 1;
  });
  console.log(network1NodeList);
};