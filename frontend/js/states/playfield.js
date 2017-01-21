'use strict';

var CONFIG = require('../config');
var Ship = require('../prefabs/ship');



var PlayfieldState = function() {
};

PlayfieldState.prototype.preload = function() {
};

PlayfieldState.prototype.create = function() {
    console.log('PLAY FIELD');

    //var Bird = function(game, x, y, frame) {  
     // The super call to Phaser.Sprite
     // Phaser.Sprite.call(this, game, x, y, ‘bird’, frame);

     // // set the sprite’s anchor to the center
     // this.anchor.setTo(0.5, 0.5);

     // // add and play animations
     // this.animations.add(‘flap’);
     // this.animations.play(‘flap’, 12, true);

    //
    //this.bird = this.add.sprite(200,5,’bird’);  

    //Ship.prototype.constructor = function(game, x, y, frame, controls) {


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


    this.dogShip = new Ship(this, 100, 100, this.cursors);
   /*
    // Our ships bullets
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    //  All 40 of them
    this.bullets.createMultiple(40, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);

    this.bulletTime = 0;
    this.sprite = this.game.add.sprite(300, 300, 'ship');
    this.sprite.anchor.set(0.5);
    //  and its physics settings
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.drag.set(100);
    this.sprite.body.maxVelocity.set(200);

    //  Game input
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    */
};

PlayfieldState.prototype.update = function() {
    /*
    if (this.cursors.up.isDown)
    {
        this.game.physics.arcade.accelerationFromRotation(this.sprite.rotation, 200, this.sprite.body.acceleration);
    }
    else
    {
        this.sprite.body.acceleration.set(0);
    }

    if (this.cursors.left.isDown)
    {
        this.sprite.body.angularVelocity = -300;
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.angularVelocity = 300;
 this   }
    else
    {
        this.sprite.body.angularVelocity = 0;
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        this.fireBullet();
    }
    */
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
