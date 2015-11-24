'use strict';

const monument = require('monument')
    , defaultPort = 3030;

require('./data/family');

monument.server({
    routePath: './routes'
    , templatePath: './templates'
    , publicPath: './public'
    , port: process.env.PORT || defaultPort
});
