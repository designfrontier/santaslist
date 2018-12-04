/* eslint-env node, mocha */

'use strict';

const assert = require('chai').assert
      , events = require('monument').events;

require('./receivers.js');

describe('recievers tests', () => {
    it('should respond to data:get:receivers', (done) => {
        events.once('data:set:receivers:houston', (data) => {
            assert.ok(Array.isArray(data));
            done();
        });

        events.emit('data:get:receivers', {
            id: 'houston'
            , family: {
                offset: 1
                , yearStarted: '2001'
                , members: [ 'test', 'test2' ]
            }
        });
    });
});
