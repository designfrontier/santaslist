'use strict';

const events = require('monument').events
    , mainTemplate = require('../templates/main')

    , generateOffset = (startYear) => {
        const offset = startYear - new Date().getFullYear() + 2;

        return offset;
    };

events.on('route:/:get', (connection) => {
    events.once('data:set:family', (family) => {
        const offset = generateOffset(family.yearStarted)

            , recievers = family.members.map((person, index, arr) => {
                if (offset + index >= arr.length) {
                    return arr[index + offset - arr.length];
                } else {
                    return arr[index + offset];
                }
            });

        connection.res.send(mainTemplate({ family: family.members, targets: recievers }));
    });

    events.emit('data:get:family');
});
