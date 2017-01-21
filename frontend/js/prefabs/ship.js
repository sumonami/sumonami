
'use strict';

var Ship = function(state, x, y, controls) {
    // instanciate object 
    Phaser.Sprite.call(this, state.game, x, y, 'ship');
    // constante
    this.x = x;
    this.y = y;
    this.controls = controls;
    this.anchor.set(0.5);

    //physics
    state.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.set(100);
    this.body.maxVelocity.set(200);
    
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

    // TODO: move to Ship.addBullets?
    this.bulletTime = 0;
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(40, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);

   
    console.log(this);
};

Ship.prototype = Object.create(Phaser.Sprite.prototype);

Ship.prototype.constructor = Ship;

  // prefab specific frame update code
Ship.prototype.update = function() {
    if (this.controls.forward.isDown)
    { this.game.physics.arcade.accelerationFromRotation(this.rotation, 20, this.body.acceleration); }
    else
    { this.body.acceleration.set(0); }

    if (this.controls.left.isDown)
    { this.body.angularVelocity = -30; }
    else if (this.controls.right.isDown)
    { this.body.angularVelocity = 30; }
    else
    { this.body.angularVelocity = 0; }

    if (this.controls.fire1.isDown)
    { this.fireBullet(); }

    if (this.controls.fire2.isDown)
    { this.fireWave(); }

    this.waves.forEachExists(this.scaleSprite, this, 0.02);
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
            wave.reset(this.body.x + 16, this.body.y + 16);
            wave.lifespan = 2000;
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
        }
    }
};

Ship.prototype.scaleSprite = function (sprite, increment){
        sprite.scale.setTo(sprite.scale.x + increment);
        sprite.alpha -= 0.01;
    };


module.exports = Ship;
/*
sprite.cursors = new Object();
sprite.cursors.forward = game.input.keyboard.addKey(Phaser.Keyboard.W);
sprite.cursors.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
sprite.cursors.right = game.input.keyboard.addKey(Phaser.Keyboard.D);


sprite.myfire = function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.body.x + 16, sprite2.body.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = sprite.rotation;
            game.physics.arcade.velocityFromRotation(sprite.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 50;
        }
    }

}
sprite.cursors.fire = game.input.keyboard.addKey(Phaser.Keyboard.Q);
sprite.cursors.fire.onDown.add(sprite.myfire);

*/
