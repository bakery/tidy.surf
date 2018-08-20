const fs = require('fs')
const countries = require('./countries.json')
const _ = require('lodash')
const scrapeIt = require('scrape-it')
var decodeHtml = require('decode-html');

const getTopCitiesInCountry = url => {
  const topCitiesUrl = `${url}?top100=yes`;
  console.log(`hittings ${topCitiesUrl}`);
  return scrapeIt(topCitiesUrl, {
    links: {
      listItem: 'a',
      data: {
        name: {
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
        name: decodeHtml(l.name),
        locationParts: l.href.match(/^\/locations\/(.+)\/tides\/latest$/i)[1].split('-')
      })
    );
    console.log(locationLinks, `total: ${locationLinks.length}`);
    return locationLinks;
  })
}

const processCountry = ({ name, link, countryCode }) => {
  return getTopCitiesInCountry(link).then(topCities => {
    const outputFileName = `./results/${countryCode}.json`;

    if (fs.existsSync(outputFileName)) {
      console.log(`${outputFileName} already exists. Skipping ${name}`);
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const cities = _.map(topCities, tc => ({
        name: tc.name,
        locationParts: tc.locationParts,
        countryCode,
        country: name
      }));

      fs.writeFile(outputFileName, JSON.stringify(cities), function(err) {
        if(err) {
          reject(err)
        } else {
          resolve();
        }
      });
    });
  })
};


function processAllCountries(countries) {
  const f = error => {
    if (error) {
      console.error(`Error processing country: ${error.message}`);
    }

    return processAllCountries(_.tail(countries))
  };

  return countries.length === 0 ? Promise.resolve() :
    processCountry(_.first(countries)).then(() => f()).catch(f);
}

processAllCountries(countries);

// _.each(countries, ({ name, link, countryCode}) => {
//   console.log(`${name} ${link} ${countryCode}`)
// });

//processCountry(countries[0]).then(() => console.log('Done')).catch(error => console.error(`Failed: ${error.message}`))

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));

