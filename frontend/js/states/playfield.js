'use strict';

var CONFIG = require('../config');
var Ship = require('../prefabs/ship');



var PlayfieldState = function() {
};

PlayfieldState.prototype.preload = function() {
};

PlayfieldState.prototype.create = function() {
    console.log('PLAY FIELD');

    //  This will run in Canvas mode, so let's gain a little speed and display
    this.game.renderer.clearBeforeRender = false;
    this.game.renderer.roundPixels = true;

    //  We need arcade physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A spacey background
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

    this.cursors = new Object();
    this.cursors.forward = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.cursors.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.cursors.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.cursors.fire1 = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.cursors.fire2 = this.game.input.keyboard.addKey(Phaser.Keyboard.E);


    this.dogShip = new Ship(this, 100, 100, this.cursors);
   /*
    //  Game input
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    */
};

PlayfieldState.prototype.update = function() {
};

module.exports = PlayfieldState;
