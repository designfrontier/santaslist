'use strict';

const { deflate, unzip } = require('zlib')
  , makeURL = (data, cb) => {
    const str = JSON.stringify(data);

    deflate(str, (err, buffer) => {
      if (!err) {
        cb(null, buffer.toString('base64'));
      } else {
        // handle error
        cb(err);
      }
    });
  }
  , urlToData = (string, cb) => {
    const buffer = Buffer.from(string, 'base64');

    unzip(buffer, (err, buffer) => {
      if (!err) {
        cb(null, JSON.parse(buffer.toString()));
      } else {
        // handle error
        cb(err);
      }
    });
  };

module.exports = {
  urlToData
  , makeURL
};
