const _ = require('lodash')
const scrapeIt = require('scrape-it')

const getTopCitiesInCountry = url =>
  scrapeIt(url, {
    links: {
      listItem: 'a',
      data: {
        content: {
          selector: 'div',
          how: 'html'
        }, 
        href: {
          attr: 'href'
        }
      }
    }
  }).then(({ data }) => {
    // filter all the links down to
    const locationLinks = _.map(
      _.filter(data.links, l => l.href && l.href.match(/^\/locations\/.+\/tides\/latest$/i)),
      l => _.extend(l, {
        locationParts: l.href.match(/^\/locations\/(.+)\/tides\/latest$/i)[1].split('-')
      })
    );
    console.log(locationLinks, `total: ${locationLinks.length}`);
  })


getTopCitiesInCountry('https://www.tide-forecast.com/countries/United-States?top100=yes')
