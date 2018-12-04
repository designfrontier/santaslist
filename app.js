'use strict';
const monument = require('monument')
    , defaultPort = 3030;

require('./data/family');
require('./data/receivers.js');

monument.server({
    routePath: './routes'
    , templatePath: './templates'
    , publicPath: './public'
    , port: process.env.PORT || defaultPort
});
