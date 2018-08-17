/* globals module: true */

const withCss = require('@zeit/next-css')
const { ANALYZE } = process.env

module.exports = withCss({
  publicRuntimeConfig: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_SEARCH_KEY
    }
  },
  webpack (config, { isServer }) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1000,
          publicPath: './',
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      },
    })

    if (ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true
      }))
    }

    return config
  }
})