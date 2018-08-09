/* globals module: true */

const withCss = require('@zeit/next-css')

module.exports = withCss({
  publicRuntimeConfig: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_SEARCH_KEY
    }
  },
})