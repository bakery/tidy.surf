/* globals module: false */

const debug = require('debug')('app')
const sm = require('sitemap')

const sitemap = sm.createSitemap({
  hostname: process.env.SITEMAP_HOST_NAME,
  cacheTime: 600000, // 600 sec - cache purge period
  urls: [
    { url: '/tides/lisbon-lisbon-portugal' },
    { url: '/tides/lisbon-lisbon-portugal' },
    { url: '/tides/coolangatta-queensland-australia' },
  ],
})

module.exports = {
  connect: function (server) {
    server.get('/sitemap.xml', (req, res) => {
      sitemap.toXML((err, xml) => {
        if (err) {
          debug(`Sitemap error: ${err.message}`)
          res.status(500).end()
        }

        res.header('Content-Type', 'application/xml')
        res.send(xml)
      })
    })
  }
}
