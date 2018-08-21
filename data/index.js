require('dotenv').config();

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const { Location, attachGeo, markLocationAsChecked } = require('./models/location');
const { getGeoAndTZ } = require('./geo');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;


const geoTagEverything = () => {
  Location.findOne().needsLocationAndTimezoneInfo().exec((err, item) => {
    if (err) {
      console.error(`Failed to grab item to update: ${err.message}`);
      geoTagEverything();
    } else {
      if (!item) {
        return;
      }

      console.log('Gonna geo tag', item);

      const { country, locationParts } = item;

      getGeoAndTZ(country, locationParts).then(locationInfo => {
        console.log('location info is:', JSON.stringify(locationInfo));
        return attachGeo(item, locationInfo);
      }).catch(error => {
        console.error(error.message);
        markLocationAsChecked(item);
      }).then(() => {
        geoTagEverything();
      });
    }
  });  
};

const loadJSONIntoDB = () => {
  const baseDir = './results';

  fs.readdir(baseDir, (err, files) => {
    if (err) {
      console.error(`Failed to grab files from ./results: ${err.message}`);
      return;
    }

    files.forEach( function(file) {
      const fullPath = path.resolve(baseDir, file);
      const locations = JSON.parse(fs.readFileSync(fullPath));

      console.log(`processing ${fullPath} - ${locations.length} locations`);

      Location.insertMany(_.map(locations, l => _.extend(l, { city: l.name })), (error, docs) => {
        if (error) {
          console.error(`Failed to insert locations for ${file}: ${error.message}`);
        } else {
          console.log(`Locations inserted for ${file}`);
        }
      });
    });
  });
}

db.on('error', error => console.error(`Failed to connect to the DB: ${error.message}`));
db.once('open', () => {
  console.log('All connected!');
});
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));
