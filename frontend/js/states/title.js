/**
 * title.js
 * State for the game title screen.
**/
'use strict';

var CONFIG = require('../config');
var _common = require('./_common');

var TitleState = function() {};

TitleState.prototype.preload = function() {
    _common.setGameScale(this.game);
};

TitleState.prototype.create = function() {
    this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'titleBackground');
    this.text = this.game.add.sprite(0, 0, 'titleText');
    this.startButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.startButton.onDown.add(this.startGame, this);

    function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
    }

    for (var i = 0; i < 100; i++) {
        //await sleep(2000);
        //this.text.body.x = i;
    }

};

TitleState.prototype.startGame = function () {
    console.log("starting!");
    this.state.start("PlayField");
};

module.exports = TitleState;
