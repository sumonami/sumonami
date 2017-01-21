'use strict';

var CONFIG = require('../config');
var Ship = require('../prefabs/ship');
var Ships = require('../prefabs/ships');



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

    //  Watery backdrop
    var water = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'water');
    var ripple = water.animations.add('ripple');
    water.animations.play('ripple', 6, true);

    this.cursors = new Object();
    this.cursors.forward = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.cursors.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.cursors.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.cursors.fire1 = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.cursors.fire2 = this.game.input.keyboard.addKey(Phaser.Keyboard.E);

    this.p2cursors = new Object();
    this.p2cursors.forward = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
    this.p2cursors.left = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
    this.p2cursors.right = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
    this.p2cursors.fire1 = this.game.input.keyboard.addKey(Phaser.Keyboard.U);

    this.ships = new Ships(this);

    this.ships.add(new Ship(this, 100, 100, this.cursors));
    this.ships.add(new Ship(this, 200, 100, this.p2cursors));

    console.log(this.ships);
};

PlayfieldState.prototype.update = function() {
};

PlayfieldState.prototype.fireBullet = function() {
    if (this.game.time.now > this.bulletTime) {
        var bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(this.sprite.body.x + 16, this.sprite.body.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = this.sprite.rotation;
            this.game.physics.arcade.velocityFromRotation(this.sprite.rotation, 400, bullet.body.velocity);
            this.bulletTime = this.game.time.now + 50;
        }
    }
};

module.exports = PlayfieldState;
