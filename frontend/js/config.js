/**
 * config.js
 * Configuration object that gets passed around the app
 * for convenience.
**/

var CONFIG = {

    stateAfterStartup: 'PlayField',

    // Pixel size of the Phaser canvas.
    // (Canvas itself is scaled to viewport)
    gameSize: {
        width: 800,
        height: 600
    },

    assetsPath: "/assets/",

    // Font style definitions
    font: {
        // Generic/default text
        baseStyle: {
            font: '24px VT323',
            fill: '#caa',
            stroke: '#000',
            strokeThickness: 1,
            align: 'center'
        },

        smallStyle: {
            font: '18px VT323',
            fill: '#c8a',
            stroke: '#000',
            strokeThickness: 1,
            align: 'center'
        }
    },

    // Game settings
    settings: {
    }

};

module.exports = CONFIG;
