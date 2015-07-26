/*
* @Author: Katrina Uychaco
* @Date:   2015-07-20 14:50:47
* @Last Modified by:   Katrina Uychaco
* @Last Modified time: 2015-07-24 21:20:52
*/

'use strict';

var brain = require('brain');

// Worker code for training neural net
module.exports = function(self) {
  
  // Process data when passed in
  self.addEventListener('message', function(data) {

    var net = new brain.NeuralNetwork({
      hiddenLayers: data.hiddenLayers
    });

    var trainingData = [
      {input: [0, 0], output: [0]},
      {input: [0, 1], output: [1]},
      {input: [1, 0], output: [1]},
      {input: [1, 1], output: [0]}
    ];

    var options = {
      callback: function(result) {
        var output = net.run([1, 0]);  // [0.987]
        result.output = output;
        self.postMessage(result);
      },
      callbackPeriod: 1,
      errorThresh: data.errorThresh,
      learningRate: data.learningRate
    };

    net.train(trainingData, options);

  }); 
};
