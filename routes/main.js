'use strict';

const events = require('monument').events
  , mainTemplate = require('../templates/main')

  , generateOffset = require('../lib/generate-offset');

events.on('route:/:get', (connection) => {
  events.once('data:set:family', (family) => {
    if (typeof family === 'undefined') {
      events.emit('error:404', connection);
      return;
    }

    const offset = generateOffset(family.yearStarted, family.randomSeed, family.members.length)
      , recievers = family.members.map((_, index, arr) => {
        return offset + index >= arr.length ?
          arr[index + offset - arr.length] :
          arr[index + offset];
      });

    connection.res.send(mainTemplate({ family: family.members, targets: recievers }));
  });

  events.emit('data:get:family');
});


events.on('route:/:id:get', (connection) => {
  events.once(`data:set:family:${connection.params.id}`, (family) => {
    if (typeof family === 'undefined') {
      events.emit('error:404', connection);
      return;
    }

    events.once(`data:set:receivers:${connection.params.id}`, (receivers) => {
      connection.res.send(mainTemplate({ family: family.members.map((p, i) => {
        return { receiver: receivers[i], giver: p };
      }) }));
    });

    events.emit('data:get:receivers', { id: connection.params.id, family: family });
  });

  events.emit('data:get:family', connection.params.id);
});
