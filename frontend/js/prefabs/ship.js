'use strict';

var CONFIG = require('../config');

var Ship = function(state, x, y, controls) {
    // instantiate object
    Phaser.Sprite.call(this, state.game, x, y, 'ship');
    // constants
    this.x = x;
    this.y = y;
    this.controls = controls;
    this.anchor.set(0.5);

    //physics
    state.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.enableBody = true;
    this.body.drag.set(100);
    this.body.maxVelocity.set(800);
    this.body.collideWorldBounds=true;
    // this.body.bounce.y=0.2;
    // this.body.bounce.x=0.2;
    this.repel_scaling_factor=0.8;
    this.repel_max_range=100;
    this.repel_initial_vel=250;

    // Rate of acceleration on keypress, don't confuse with this.body.acceleration!
    this.acceleration_increment=40;

    // TODO: move to Ship.addWaves?
    // Add before the ship so they're under the sprite
    this.waveTime = 0;
    this.waves = this.game.add.group();
    this.waves.enableBody = true;
    this.waves.physicsBodyType = Phaser.Physics.ARCADE;
    this.waves.createMultiple(3, 'wave');
    this.waves.setAll('anchor.x', 0.5);
    this.waves.setAll('anchor.y', 0.5);

    // add to canvas and log
    state.game.add.existing(this);

    this.bulletTime = 0;
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(40, 'dog-bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);

};

Ship.prototype = Object.create(Phaser.Sprite.prototype);

Ship.prototype.constructor = Ship;

Ship.prototype.update = function() {
    this.speed = 10;
    if (this.controls.forward.isDown)
    { this.body.velocity.y -= this.speed; }
    else if (this.controls.backward.isDown)
    { this.body.velocity.y += this.speed; }
    else
    { this.body.acceleration.set(0); }

    if (this.controls.left.isDown)
    { this.body.velocity.x -= this.speed; }
    else if (this.controls.right.isDown)
    { this.body.velocity.x += this.speed; }

    this.controls.fire1.onDown.add(this.fireBullet, this);
    this.controls.fire2.onDown.add(this.fireWave, this);

    // Dog spin
    this.bullets.setAll('angle', 10, false, false, 1);
    // Make first spin faster for the lulz
    var wee = this.bullets.getFirstAlive();
    if (wee) wee.angle += 10;

    this.waves.forEachExists(this.scaleSprite, this, 0.02);
    //this.game.debug.body(this);
};

Ship.prototype.fireBullet = function () {

    if (this.game.time.now > this.bulletTime)
    {
        this.bullet = this.bullets.getFirstExists(false);

        if (this.bullet)
        {
            this.bullet.reset(this.body.x + 16, this.body.y + 16);
            this.bullet.lifespan = 2000;
            this.bullet.rotation = this.rotation;
            this.game.physics.arcade.velocityFromRotation(this.rotation, 400, this.bullet.body.velocity);
            this.bulletTime = this.game.time.now + 50;
        }
    }

};

Ship.prototype.fireWave = function() {
    if (this.game.time.now > this.waveTime) {
        var wave = this.waves.getFirstExists(false);

        if (wave)
        {
            wave.rotation = this.rotation;
            this.game.physics.arcade.velocityFromRotation(0, 0, 0);
            this.waveTime = this.game.time.now + 50;

            wave.reset(this.body.x + this.body.width/2, this.body.y + this.body.height/2);
            wave.scale.setTo(0.1);
            wave.alpha = 1;
            wave.lifespan = 2000;
            wave.rotation = this.rotation;
            this.game.physics.arcade.velocityFromRotation(0, 0, 0);
            //The number is the delay between shots
            this.waveTime = this.game.time.now + 200;

            this.parent.forEachExists(this.repelShip, this);
        }
    }
};

Ship.prototype.repelShip = function (ship) {
    var dist = this.game.physics.arcade.distanceBetween(ship, this);
    var ang = this.game.physics.arcade.angleBetween(ship, this);

    if (dist < this.repel_max_range && dist != 0)
    {
        var scaling_factor = ( (this.repel_max_range - dist) / this.repel_max_range);
        console.log("dist:"+dist+", factor:"+scaling_factor+", scaled:"+scaled_velocity);

        var scaled_velocity = (-1 * this.repel_initial_vel * scaling_factor); // scale down
        ship.game.physics.arcade.velocityFromRotation(ang, scaled_velocity, ship.body.velocity);
    }
    else {
        console.log("out of range!");
    }
};

Ship.prototype.render = function (){
}

Ship.prototype.scaleSprite = function (sprite, increment){
        sprite.scale.setTo(sprite.scale.x + increment);
        sprite.alpha -= 0.01;
    };


module.exports = Ship;
