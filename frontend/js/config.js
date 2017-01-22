/**
 * config.js
 * Configuration object that gets passed around the app
 * for convenience.
**/

var CONFIG = {

    stateAfterStartup: 'TitleState',

    // Pixel size of the Phaser canvas.
    // (Canvas itself is scaled to viewport)
    gameSize: {
        width: 1365,
        height: 768
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
