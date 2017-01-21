'use strict';

var CONFIG = require('../config');
var _common = require('./_common');
var Ship = require('../prefabs/ship');
var Ships = require('../prefabs/ships');



var PlayfieldState = function() {
};

PlayfieldState.prototype.preload = function() {
    _common.setGameScale(this.game);
};

PlayfieldState.prototype.create = function() {
    console.log('PLAY FIELD');

    //  This will run in Canvas mode, so let's gain a little speed and display
    this.game.renderer.clearBeforeRender = false;
    this.game.renderer.roundPixels = true;

    //  We need arcade physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Watery backdrop
    var water = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'water');
    var ripple = water.animations.add('ripple');
    water.animations.play('ripple', 6, true);

    this.cursors = new Object();
    this.cursors.forward = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.cursors.backward = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.cursors.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.cursors.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.cursors.fire1 = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.cursors.fire2 = this.game.input.keyboard.addKey(Phaser.Keyboard.E);

    this.p2cursors = new Object();
    this.p2cursors.forward = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
    this.p2cursors.backward = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
    this.p2cursors.left = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
    this.p2cursors.right = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
    this.p2cursors.fire1 = this.game.input.keyboard.addKey(Phaser.Keyboard.U);
    this.p2cursors.fire2 = this.game.input.keyboard.addKey(Phaser.Keyboard.O);

    this.ships = new Ships(this);

    this.ships.add(new Ship(this, 100, 100, this.cursors));
    this.ships.add(new Ship(this, 200, 100, this.p2cursors));

    this.game.physics.enable(this.ships, Phaser.Physics.ARCADE);

};

PlayfieldState.prototype.update = function() {
    this.game.physics.arcade.collide(this.ships);
};

module.exports = PlayfieldState;
