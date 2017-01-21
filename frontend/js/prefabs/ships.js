
'use strict';

//Documentation for Phaser's (2.6.2) group:: phaser.io/docs/2.6.2/Phaser.Group.html
Ships.prototype = Object.create(Phaser.Group.prototype);

  // prefab initialization and construction
Ships.prototype.constructor = function(game, parent) {
  Phaser.Group.call(this, game, parent);

};

  // prefab specific frame update code
Ships.prototype.update = function() {

};

module.exports = Ships;
