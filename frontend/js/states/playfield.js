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

PlayfieldState.prototype.init = function(numPlayers, curScores) {
    console.log("PLAY FIELD INIT");
    this.numPlayers = numPlayers;
    this.curScores = curScores;
    _common.setGameScale(this.game);
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
    this.createPlayers(state.numPlayers);

};

PlayfieldState.prototype.endRound= function() {
    console.log("Round over!");
    for (var i = 0; i < this.ships.children.length; i++) {
        var checkShip = this.ships.children[i];
        if (checkShip.alive) {
            console.log("player "+ i + " won!");
            this.curScores["player"+i]["wins"] += 1;
        }
    }

    this.game.state.start("EndState", true, false, this.numPlayers, this.curScores);

};

PlayfieldState.prototype.update = function() {
    this.game.physics.arcade.collide(this.ships);
    if (this.ships.countLiving() == 1 ) {
        this.endRound();
    }
};

PlayfieldState.prototype.createBackground = function() {
    var state = this;
    //  Watery backdrop
    var water = state.game.add.tileSprite(0, 0, state.game.width, state.game.height, 'water');
    var ripple = water.animations.add('ripple');
    water.animations.play('ripple', 6, true);
};

PlayfieldState.prototype.createPlayers = function(numPlayers) {
    var state = this;
    var players = {
        player1: {
            initLoc: [350, 200],
            sprite: 'player1',
            controls: {
                forward: state.game.input.keyboard.addKey(Phaser.Keyboard.TWO),
                backward: state.game.input.keyboard.addKey(Phaser.Keyboard.Q),
                left: state.game.input.keyboard.addKey(Phaser.Keyboard.ONE),
                right: state.game.input.keyboard.addKey(Phaser.Keyboard.W),
                fire1: state.game.input.keyboard.addKey(Phaser.Keyboard.F1),
                fire2: state.game.input.keyboard.addKey(Phaser.Keyboard.F2)
            },
            image: 'player1'
        },
        player2: {
            initLoc: [750, 200],
            sprite: 'player2',
            controls: {
                forward: state.game.input.keyboard.addKey(Phaser.Keyboard.SIX),
                backward: state.game.input.keyboard.addKey(Phaser.Keyboard.T),
                left: state.game.input.keyboard.addKey(Phaser.Keyboard.FIVE),
                right: state.game.input.keyboard.addKey(Phaser.Keyboard.Y),
                fire1: state.game.input.keyboard.addKey(Phaser.Keyboard.NINE),
                fire2: state.game.input.keyboard.addKey(Phaser.Keyboard.ZERO)
            },
            image: 'player2'
        },
        player3: {
            initLoc: [350, 600],
            sprite: 'player3',
            controls: {
                forward: state.game.input.keyboard.addKey(Phaser.Keyboard.S),
                backward: state.game.input.keyboard.addKey(Phaser.Keyboard.Z),
                left: state.game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: state.game.input.keyboard.addKey(Phaser.Keyboard.X),
                fire1: state.game.input.keyboard.addKey(Phaser.Keyboard.F3),
                fire2: state.game.input.keyboard.addKey(Phaser.Keyboard.F4)
            },
            image: 'player3'
        },
        player4: {
            initLoc: [750, 600],
            sprite: 'player4',
            controls: {
                forward: state.game.input.keyboard.addKey(Phaser.Keyboard.H),
                backward: state.game.input.keyboard.addKey(Phaser.Keyboard.B),
                left: state.game.input.keyboard.addKey(Phaser.Keyboard.G),
                right: state.game.input.keyboard.addKey(Phaser.Keyboard.N),
                fire1: state.game.input.keyboard.addKey(Phaser.Keyboard.MINUS),
                fire2: state.game.input.keyboard.addKey(Phaser.Keyboard.PLUS)
            },
            image: 'player4'
        },
        player5: {
            initLoc: [550, 200],
            sprite: 'player5',
            controls: {
                forward: state.game.input.keyboard.addKey(Phaser.Keyboard.FOUR),
                backward: state.game.input.keyboard.addKey(Phaser.Keyboard.E),
                left: state.game.input.keyboard.addKey(Phaser.Keyboard.THREE),
                right: state.game.input.keyboard.addKey(Phaser.Keyboard.R),
                fire1: state.game.input.keyboard.addKey(Phaser.Keyboard.F5),
                fire2: state.game.input.keyboard.addKey(Phaser.Keyboard.F6)
            },
            image: 'player5'
        },
        player6: {
            initLoc: [950, 200],
            sprite: 'player6',
            controls: {
                forward: state.game.input.keyboard.addKey(Phaser.Keyboard.EIGHT),
                backward: state.game.input.keyboard.addKey(Phaser.Keyboard.U),
                left: state.game.input.keyboard.addKey(Phaser.Keyboard.SEVEN),
                right: state.game.input.keyboard.addKey(Phaser.Keyboard.I),
                fire1: state.game.input.keyboard.addKey(Phaser.Keyboard.O),
                fire2: state.game.input.keyboard.addKey(Phaser.Keyboard.P)
            },
            image: 'player6'
        },
        player7: {
            initLoc: [550, 600],
            sprite: 'player7',
            controls: {
                forward: state.game.input.keyboard.addKey(Phaser.Keyboard.F),
                backward: state.game.input.keyboard.addKey(Phaser.Keyboard.C),
                left: state.game.input.keyboard.addKey(Phaser.Keyboard.D),
                right: state.game.input.keyboard.addKey(Phaser.Keyboard.V),
                fire1: state.game.input.keyboard.addKey(Phaser.Keyboard.F7),
                fire2: state.game.input.keyboard.addKey(Phaser.Keyboard.F8)
            },
            image: 'player7'
        },
        player8: {
            initLoc: [950, 600],
            sprite: 'player8',
            controls: {
                forward: state.game.input.keyboard.addKey(Phaser.Keyboard.K),
                backward: state.game.input.keyboard.addKey(Phaser.Keyboard.M),
                left: state.game.input.keyboard.addKey(Phaser.Keyboard.J),
                right: state.game.input.keyboard.addKey(Phaser.Keyboard.COMMA),
                fire1: state.game.input.keyboard.addKey(Phaser.Keyboard.OPEN_BRACKET),
                fire2: state.game.input.keyboard.addKey(Phaser.Keyboard.CLOSED_BRACKET)
            },
            image: 'player8'
        }
    };

    state.ships = new Ships(state);
    if (numPlayers > 4) numPlayers == 4;
    for (var i = 1; i <= numPlayers; i++) {
        state.ships.add(new Ship(state, players["player" + i]));
        console.log("player" + i + "created");
    }

    state.game.physics.enable(state.ships, Phaser.Physics.ARCADE);
};

module.exports = PlayfieldState;
