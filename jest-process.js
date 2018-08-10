/* globals module: false */

var babel = require('@babel/core')

module.exports = {
  canInstrument: true,
  process(src) {
    return babel.transform(src, {
      presets: ['@babel/env'],
    });
  },
};