'use strict';
const { events, parser } = require('monument')
  , { urlToData, makeURL } = require('../lib/url')
  , mainTemplate = require('../templates/main')
  , generateOffset = require('../lib/generate-offset')
  , pairThemUp = (family) => {
    let receivers = [].concat(family.members);

    for (let y = 0; y <= generateOffset(family.yearStarted, family.offset); y++) {
      receivers = [].concat(receivers.pop(), receivers);
    }

    if (receivers[0] === family.members[0]) {
      receivers = [].concat(receivers.pop(), receivers);
    }

    return receivers;
  };

events.on('route:/g/:id:get', (connection) => {
  urlToData(connection.params.id, (err, family) => {
    if (err) {
      events.emit('error:500', { connection });
      return;
    }

    const receivers = pairThemUp(family);

    connection.res.send(mainTemplate({ family: family.members.map((p, i) => {
      return { receiver: receivers[i], giver: p };
    }) }));
    return;
  });
});


events.on('route:/g:post', (connection) => {
  parser(connection, (body) => {
    makeURL(body, (err, res) => {
      if (err) {
        events.emit('error:400');
      }

      connection.res.redirect(`/g/${res}`, 302);
    });
  });
});
