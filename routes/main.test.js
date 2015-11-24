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
        assert.include(fakeConnection.out().response, 'Daniel');
        assert.include(fakeConnection.out().response, 'Sarah');
        assert.include(fakeConnection.out().response, 'Gabriel');
        assert.include(fakeConnection.out().response, 'Rachel');
        assert.include(fakeConnection.out().response, 'Caleb');
        assert.include(fakeConnection.out().response, 'Joel');
    });
});
