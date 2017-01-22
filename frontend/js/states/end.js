/**
 * end.js
 * State for the game end screen.
**/
'use strict';
var CONFIG = require('../config');
var _common = require('./_common');

var EndState = function() {};

EndState.prototype.preload = function() {
    _common.setGameScale(this.game);
};

EndState.prototype.create = function() {
    this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'titleBackground');
    this.text = this.game.add.sprite(0, 0, 'titleText');
    this.text.anchor.set(0.5);
    this.text.x = this.game.width / 2;
    this.text.y = this.game.height / 2;
    this.subtext = this.game.add.text(0, 0, "!!!!!GAME OVAH!!!!", CONFIG.font.bigStyle);
    this.subtext.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    this.subtext.setTextBounds(0,0,this.game.width,(this.game.height-40));

};

module.exports = EndState;
