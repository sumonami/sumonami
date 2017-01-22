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

    this.text.filters = [ this.game.add.filter('Glow')  ];

    this.game.add.tween(this.text)
            .to({ alpha: 1.0  }, 2000, Phaser.Easing.Linear.In)
            .to({ alpha: 0.1  }, 2000, Phaser.Easing.Linear.In)
            .to({ alpha: 1.0  }, 2000, Phaser.Easing.Linear.In)
            .to({ alpha: 0.1  }, 2000, Phaser.Easing.Linear.In)
            .to({ alpha: 1.0  }, 2000, Phaser.Easing.Linear.In)
            .to({ alpha: 1.0  }, 2000, Phaser.Easing.Linear.In)
            .to({ alpha: 0.1  }, 2000, Phaser.Easing.Linear.In)
            .to({ alpha: 1.0  }, 2000, Phaser.Easing.Linear.In)
            .to({ alpha: 0.1  }, 2000, Phaser.Easing.Linear.In)
            .to({ alpha: 1.0  }, 2000, Phaser.Easing.Linear.In)
            .start();

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

Phaser.Filter.Glow = function (game) {
        Phaser.Filter.call(this, game);

    this.fragmentSrc = [
                "precision lowp float;",
                "varying vec2 vTextureCoord;",
                "varying vec4 vColor;",
                'uniform sampler2D uSampler;',

                'void main() {',
                    'vec4 sum = vec4(0);',
                    'vec2 texcoord = vTextureCoord;',
                    'for(int xx = -4; xx <= 4; xx++) {',
                        'for(int yy = -3; yy <= 3; yy++) {',
                            'float dist = sqrt(float(xx*xx) + float(yy*yy));',
                            'float factor = 0.0;',
                            'if (dist == 0.0) {',
                                'factor = 2.0;',
                            '} else {',
                                'factor = 2.0/abs(float(dist));',
                            '}',
                            'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * factor;',
                        '}',
                    '}',
                    'gl_FragColor = sum * 0.025 + texture2D(uSampler, texcoord);',
                '}'
            
    ];

};

Phaser.Filter.Glow.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Glow.prototype.constructor = Phaser.Filter.Glow;



module.exports = TitleState;
