'use strict';

const events = require('monument').events
    , fetchingStore = {}
    , cache = require('node-cached')

    , family = {
        yearStarted: '2015'
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
        ]
    };

events.on('data:get:family', () => {
    const cached = cache.get('data.family');

    if (cached === null && !fetchingStore['data.family']) {
        // get data from async source faked here by process.nextTick
        // fetchingStore['data.family'] = true;

        // fetchingStore['data.family'] = false;
        events.emit('data:set:family', family);
        cache.add('data.family', family, 300000);
    } else if (cached !== null) {
        events.emit('data:set:family', cached);
    }
});
