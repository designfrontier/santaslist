/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , events = require('monument').events;

require('./family.js');

describe('family Handler tests', () => {
    it('should respond to data:get:family', (done) => {
        events.once('data:set:family', (data) => {
            assert.isObject(data);
            assert.isDefined(data.members);
            assert.isDefined(data.yearStarted);
            done();
        });

        events.emit('data:get:family');
    });
});
