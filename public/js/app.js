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
  console.log('#############\n ', result.iterations, '\n', result.error, '\n', result.brain);
});

$(document).ready(function() {
  $('form').submit(function(e) {
    
    e.preventDefault();

    var formData = {
      'hiddenLayers': $('#hiddenLayers').val()
    };

    socket.emit('train', formData);
    $('#hiddenLayers').val('');
    console.log('train brains!');

  });

});