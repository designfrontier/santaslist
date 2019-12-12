/* eslint-env node, mocha */
'use strict';

const test = require('ava'),
      events = require('monument').events,
      fakeConnection = require('../test_stubs/connectionStub');

require('./g/:id');

test.beforeEach(() => {
  fakeConnection.reset();
});

test.cb('should respond to route:/g/:id:get', (t) => {
  fakeConnection.done(() => {
    t.is(fakeConnection.out().response, 'route /g/:id now responding to get requests');
    t.end();
  });

  events.emit('route:/g/:id:get', fakeConnection);
});