/* eslint-env node, mocha */
'use strict';

const test = require('ava')
      , events = require('monument').events
      , fakeConnection = require('../test_stubs/connectionStubAva');

require('./new');

test.beforeEach(() => {
  fakeConnection.reset();
});

test.skip('should respond to route:/new:get', (t) => {
  fakeConnection.done(() => {
    t.is(fakeConnection.out().response, 'route /new now responding to get requests');
    t.end();
  });

  events.emit('route:/new:get', fakeConnection);
});
