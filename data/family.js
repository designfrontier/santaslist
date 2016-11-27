'use strict';

const events = require('monument').events
    , fetchingStore = {}
    , cache = require('node-cached')

    , families = {
        houston: {
            yearStarted: '2016'
            , randomSeed: 11984002930839366
            , members: [
                'Daniel'
                , 'Sarah'
                , 'Gabriel'
                , 'Rachel'
                , 'Caleb'
                , 'Joel'
                , 'Grandmommy'
                , 'Aunt Nancy'
                , 'Dad'
                , 'Steve'
                , 'Katie'
                , 'Ashley'
            ]
        }
        , nederland: {
            yearStarted: '2016'
            , randomSeed: 12933561301269214
            , members: [
                'Daniel'
                , 'Sarah'
                , 'Gabriel'
                , 'Rachel'
                , 'Caleb'
                , 'Joel'
                , 'Geegee'
                , 'Mom'
                , 'Jim'
                , 'Katie'
            ]
        }
        , empty: {
            yearStarted: '2015'
            , randomSeed: 9454413759692157
            , members: []
        }
    };

events.on('data:get:family', (id) => {
    const hasId = typeof id !== 'undefined'
        , cached = hasId ? cache.get(`data.family.${id}`) : cache.get('data.family');

    if (cached === null && !fetchingStore['data.family']) {
        // get data from async source faked here by process.nextTick
        // fetchingStore['data.family'] = true;

        // fetchingStore['data.family'] = false;

        if (hasId) {
            events.emit(`data:set:family:${id}`, families[id]);
            cache.add(`data.family.${id}`, families[id], 300000);
        } else {
            events.emit('data:set:family', families.empty);
            cache.add('data.family', families.empty, 300000);
        }
    } else if (cached !== null) {
        if (hasId) {
            events.emit(`data:set:family:${id}`, families[id]);
        } else {
            events.emit('data:set:family', cached);
        }
    }
});
