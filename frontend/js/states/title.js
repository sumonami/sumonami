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
    var bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'titleBackground');
    var title = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'titleText');
    this.startButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.startButton.onDown.add(this.startGame, this);

}

TitleState.prototype.startGame = function () {
    console.log("starting!");
    this.state.start("PlayField");
}

module.exports = TitleState;
