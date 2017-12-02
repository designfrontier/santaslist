'use strict';

const events = require('monument').events
    , mainTemplate = require('../templates/main')
    , seedRandom = require('seedrandom')

    , generateOffset = (startYear, seed, arraySize) => {
        const rng = seedRandom(seed);
        let offsetNew;

        for (let i = 0; i <= new Date().getFullYear() - startYear; i++) {
            offsetNew = Math.floor(rng() * arraySize);
        }

        return offsetNew;
    };

events.on('route:/:get', (connection) => {
    events.once('data:set:family', (family) => {
        if (typeof family === 'undefined') {
            events.emit('error:404', connection);
            return;
        }

        const offset = generateOffset(family.yearStarted, family.randomSeed, family.members.length)

            , recievers = family.members.map((person, index, arr) => {
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

        const offset = generateOffset(family.yearStarted, family.randomSeed, family.members.length)
            , recievers = family.members.map((person, index, arr) => {
                console.log(offset);
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
