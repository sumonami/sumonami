/**
 * end.js
 * State for the game end screen.
**/
'use strict';
var CONFIG = require('../config');
var _common = require('./_common');

var EndState = function() {};

EndState.prototype.init = function(numPlayers, scores) {
    console.log("END INIT");
    this.numPlayers = numPlayers;
    this.scores = scores;
    console.log(this);

}

EndState.prototype.preload = function() {
    _common.setGameScale(this.game);
    this.audioApplauseBgm = this.game.add.audio('bgm-applause');
};
EndState.prototype.new_round = function() {
    console.log("NEW ROUND");
    this.state.start("PlayField", true, false, this.numPlayers, this.scores);

};

EndState.prototype.restart = function(state, numPlayers) {

    this.state.start("TitleState", true, false );

};

EndState.prototype.create = function() {
    this.audioApplauseBgm.play();
    this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'titleBackground');
    // this.text = this.game.add.sprite(0, 0, 'titleText');
    // this.text.anchor.set(0.5);
    // this.text.x = this.game.width / 2;
    // this.text.y = this.game.height / 2;
    console.log("END CREATE");
    console.log(this.scores);
    console.log(this.scores["player1"]);
    var printerText = "";
    for (var i = 1; i <= this.numPlayers; i++) {
        printerText = printerText.concat("Player"+i+":  WINS: "+this.scores["player"+i]["wins"]+" SAUSAGES: "+this.scores["player"+i]["sausages"]+"\n");
    }

    this.scoreText = this.game.add.text(0, 0, printerText, CONFIG.font.bigStyle);
    this.subtext = this.game.add.text(0, 0, "GAME OVAH! Again? (y/n)", CONFIG.font.bigStyle);
    this.subtext.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    this.subtext.setTextBounds(0,0,this.game.width,(this.game.height-40));


    this.yButton = this.game.input.keyboard.addKey(Phaser.Keyboard.Y);
    this.yButton.onDown.add(this.new_round, this);
    this.nButton = this.game.input.keyboard.addKey(Phaser.Keyboard.N);
    this.nButton.onDown.add(this.restart, this);

};

module.exports = EndState;
