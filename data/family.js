'use strict';

const events = require('monument').events
    , fetchingStore = {}
    , cache = require('node-cached')

    , families = {
        houston: {
            yearStarted: '2016'
            , offset: 7
            , members: [
                'Daniel'
                , 'Gabriel'
                , 'Rachel'
                , 'Caleb'
                , 'Joel'
                , 'Grandmommy'
                , 'Aunt Nancy'
                , 'Sarah'
                , 'Katie'
                , 'Aunt Susan'
            ]
        }
        , nederland: {
            yearStarted: '2016'
            , offset: 7
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
            , offset: 7
            , members: []
        }
    };

events.on('data:get:family', (id) => {
    const hasId = typeof id !== 'undefined'
        , cached = hasId ? cache.get(`data.family.${id}`) : cache.get('data.family');

    if (cached === null && !fetchingStore['data.family']) {
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
