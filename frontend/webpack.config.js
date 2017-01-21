'use strict';

var webpack = require('webpack');

module.exports = {
    entry: {
        'main': './boot.js'
    },
    output: {
        path: '../static/',
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: false,
            compress: {
                drop_console: false
            }
        })
    ]
};
