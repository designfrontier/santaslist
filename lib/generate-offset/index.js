'use strict';

module.exports = (startYear, offset) => {
  return new Date().getFullYear() + offset - startYear;
};
