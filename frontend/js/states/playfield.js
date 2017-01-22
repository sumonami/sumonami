'use strict';

var CONFIG = require('../config');
var _common = require('./_common');
var Ship = require('../prefabs/ship');
var Ships = require('../prefabs/ships');



var PlayfieldState = function() {
};

PlayfieldState.prototype.preload = function() {
    _common.setGameScale(this.game);
    console.log("PLAY FIELD PRELOAD");
};

PlayfieldState.prototype.init = function(numPlayers) {
    this.numPlayers = numPlayers;
    _common.setGameScale(this.game);
    console.log(this);
    console.log("PLAY FIELD INIT");
};


PlayfieldState.prototype.create = function(game) {
    console.log("PLAY FIELD, numPlayers: "+this.numPlayers);

    var state = this;

    //  This will run in Canvas mode, so let's gain a little speed and display
    state.game.renderer.clearBeforeRender = false;
    state.game.renderer.roundPixels = true;

    //  We need arcade physics
    state.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.createBackground();
    this.createPlayers();

};

PlayfieldState.prototype.update = function() {
    this.game.physics.arcade.collide(this.ships);
};

PlayfieldState.prototype.createBackground = function() {
    var state = this;
    //  Watery backdrop
    var water = state.game.add.tileSprite(0, 0, state.game.width, state.game.height, 'water');
    var ripple = water.animations.add('ripple');
    water.animations.play('ripple', 6, true);
};

PlayfieldState.prototype.createPlayers = function() {
    var state = this;
    var players = {
        player1: {
            initLoc: [350, 400],
            controls: {
                forward: state.game.input.keyboard.addKey(Phaser.Keyboard.W),
                backward: state.game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: state.game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: state.game.input.keyboard.addKey(Phaser.Keyboard.D),
                fire1: state.game.input.keyboard.addKey(Phaser.Keyboard.Q),
                fire2: state.game.input.keyboard.addKey(Phaser.Keyboard.E)
            }
        },
        player2: {
            initLoc: [550, 400],
            controls: {
                forward: state.game.input.keyboard.addKey(Phaser.Keyboard.I),
                backward: state.game.input.keyboard.addKey(Phaser.Keyboard.K),
                left: state.game.input.keyboard.addKey(Phaser.Keyboard.J),
                right: state.game.input.keyboard.addKey(Phaser.Keyboard.L),
                fire1: state.game.input.keyboard.addKey(Phaser.Keyboard.U),
                fire2: state.game.input.keyboard.addKey(Phaser.Keyboard.O)
            }
        },
        player3: {
            initLoc: [750, 400],
            controls: {
                forward: state.game.input.keyboard.addKey(Phaser.Keyboard.T),
                backward: state.game.input.keyboard.addKey(Phaser.Keyboard.G),
                left: state.game.input.keyboard.addKey(Phaser.Keyboard.F),
                right: state.game.input.keyboard.addKey(Phaser.Keyboard.H),
                fire1: state.game.input.keyboard.addKey(Phaser.Keyboard.R),
                fire2: state.game.input.keyboard.addKey(Phaser.Keyboard.Y)
            }
        },
        player4: {
            initLoc: [950, 400],
            controls: {
                forward: state.game.input.keyboard.addKey(Phaser.Keyboard.UP),
                backward: state.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
                left: state.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
                right: state.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
                fire1: state.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
                fire2: state.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL)
            }
        }
    };

    state.ships = new Ships(state);
    for (var player in players) {
        state.ships.add(new Ship(state, players[player]));
    }

    state.game.physics.enable(state.ships, Phaser.Physics.ARCADE);
};

module.exports = PlayfieldState;
