'use strict';

var CONFIG = require('../config');

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
};

PlayfieldState.prototype.update = function() {
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
    }
    else
    {
        this.sprite.body.angularVelocity = 0;
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        this.fireBullet();
    }
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
