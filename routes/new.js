'use strict';
const events = require('monument').events
      , newTemplate = require('../templates/create');

events.on('route:/new:get', (connection) => {
  connection.res.send(newTemplate());
});
