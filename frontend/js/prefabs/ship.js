
'use strict';

var Ship = function(state, x, y, controls) {
    Phaser.Sprite.call(this, state.game, x, y, 'ship');
    this.x = x;
    this.controls = controls;
    this.y = y;
    this.anchor.set(0.5);
    state.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.set(100);
    this.body.maxVelocity.set(200);
    state.game.add.existing(this);
    console.log(this);
};

Ship.prototype = Object.create(Phaser.Sprite.prototype);

Ship.prototype.constructor = Ship;

  // prefab specific frame update code
Ship.prototype.update = function() {
    if (this.controls.forward.isDown)
    { this.game.physics.arcade.accelerationFromRotation(this.rotation, 200, this.body.acceleration); }
    else
    { this.body.acceleration.set(0); }

    if (this.controls.left.isDown)
    { this.body.angularVelocity = -300; }
    else if (this.controls.right.isDown)
    { this.body.angularVelocity = 300; }
    else
    { this.body.angularVelocity = 0; }

    //if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    //if (this.controls.fire.isDown)  // TOO: replace with callback for single bullet per press
    //{ this.fireBullet(); }
};

/*
Ship.prototype.fireBullet = function () {

    if (this.game.time.now > bulletTime)
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

}*/
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
