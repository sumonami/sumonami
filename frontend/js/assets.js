'use strict';

var CONFIG = require('./config');

/**
 * assets.js
 * List of required project assets and some simple logic
 * for preloading them in Phaser.
 * Used during the Startup state to preload and report on all
 * required assets - we do this upfront to prevent pauses/delays
 * during the game.
**/

// Object list of assets to preload
var assets = {

    // images are standard image files.
    // Format is [key, path]
    images: [
        ['player1', 'images/player1.png'],
        ['player2', 'images/player2.png'],
        ['player3', 'images/player3.png'],
        ['player4', 'images/player4.png'],
        ['player5', 'images/player5.png'],
        ['player6', 'images/player6.png'],
        ['player7', 'images/player7.png'],
        ['player8', 'images/player8.png'],
        ['dog-bullet', 'images/dog-bullet.png'],
        ['wave', 'images/blue_circle.png'],
        ['titleText', 'images/titleText.png'],
        ['titleBackground', 'images/titleBackground.png']
    ],
    spritesheets: [
        ['water', 'spritesheets/water.png', 256, 256]
    ],
    // Audio files to load
    sounds: [
        ['bgm-applause', ['audio/bgm-applause.mp3',
                          'audio/bgm-applause.opus']
        ],
        ['bgm-playfield', ['audio/bgm-playfield.mp3',
                           'audio/bgm-playfield.opus']
        ],
        ['bgm-title', ['audio/bgm-title.mp3',
                       'audio/bgm-title.opus']
        ],
        ['sfx-select', ['audio/sfx-select.mp3',
                        'audio/sfx-select.opus']
        ],
        ['sfx-startgame', ['audio/sfx-startgame.mp3',
                           'audio/sfx-startgame.opus']
        ],
        ['sfx-washed-last', ['audio/sfx-washed-last.mp3',
                             'audio/sfx-washed-last.opus']
        ],
        ['voice-sumonami', ['audio/voice-sumonami.mp3',
                            'audio/voice-sumonami.opus']
        ]
    ]
};

/**
 * Calls Phaser's load functions on the assets list and fires a callback
 * when each one completes.
 * @param game - reference to Phaser.Game instance
 * @param fileLoadedCallback - function to fire when *each* file loads
**/
function preloadAssets(game, fileLoadedCallback) {
    game.load.baseURL = CONFIG.assetsPath;

    game.load.onFileComplete.add(fileLoadedCallback, this);

    console.log('Preloading images...');
    assets.images.forEach(function(item) {
        game.load.image(item[0], item[1]);
    });

    console.log('Preloading spritesheets...');
    assets.spritesheets.forEach(function(item) {
        game.load.spritesheet(item[0], item[1], item[2], item[3]);
    });

    console.log('Preloading sounds...');
    assets.sounds.forEach(function(item) {
        game.load.audio(item[0], item[1]);
    });

    game.load.start();

}

module.exports = {
    assets: assets,
    preload: preloadAssets
};
