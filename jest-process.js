var babel = require('@babel/core')

module.exports = {
  canInstrument: true,
  process(src, filename, config, options) {
    return babel.transform(src, {
      presets: ['@babel/env'],
    });
  },
};