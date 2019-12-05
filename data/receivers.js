'use strict';

const events = require('monument').events
  , cache = require('node-cached')
  , generateOffset = require('../lib/generate-offset');

events.on('data:get:receivers', (dataIn) => {
  const cached = cache.get(`data.receivers.${dataIn.id}`);
  let receivers = [].concat(dataIn.family.members);

  if (cached === null) {
    for (let y = 0; y <= generateOffset(+dataIn.family.offset, +dataIn.family.yearStarted); y++) {
      receivers = [].concat(receivers.pop(), receivers);
    }

    if (receivers[0] === dataIn.family.members[0]) {
      receivers = [].concat(receivers.pop(), receivers);
    }

    process.nextTick(() => {
      events.emit(`data:set:receivers:${dataIn.id}`, receivers);
      cache.add(`data.receivers.${dataIn.id}`, receivers, 300000);
    });
  } else if (cached !== null) {
    events.emit(`data:set:receivers:${dataIn.id}`, cached);
  }
});
