'use strict';

const events = require('monument').events
    , mainTemplate = require('../templates/main')
    , seedRandom = require('seedrandom')

    , generateOffset = (startYear, seed, arraySize) => {
        const rng = seedRandom(seed);
        let offsetNew;

        for (let i = 0; i <= startYear - new Date().getFullYear(); i++) {
            offsetNew = Math.floor(rng() * arraySize);
            console.log('count: ' + i, offsetNew);
        }

        return offsetNew;
    };

events.on('route:/:get', (connection) => {
    events.once('data:set:family', (family) => {
        const offset = generateOffset(family.yearStarted, family.randomSeed, family.members.length)

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


events.on('route:/:id:get', (connection) => {
    events.once(`data:set:family:${connection.params.id}`, (family) => {
        const offset = generateOffset(family.yearStarted, family.randomSeed, family.members.length)

            , recievers = family.members.map((person, index, arr) => {
                if (offset + index >= arr.length) {
                    return arr[index + offset - arr.length];
                } else {
                    return arr[index + offset];
                }
            });

        connection.res.send(mainTemplate({ family: family.members, targets: recievers }));
    });

    events.emit('data:get:family', connection.params.id);
});
