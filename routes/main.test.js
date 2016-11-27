/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , events = require('monument').events
    , fakeConnection = require('../test_stubs/connectionStub');

// initialize the code to be tested
require('./main');

describe('main route file tests', () => {
    beforeEach(() => {
        fakeConnection.reset();
    });

    it('should respond to route:/:get', () => {
        events.emit('route:/:get', fakeConnection);

        assert.include(fakeConnection.out().response, 'Santa\'s List');

    });
});
