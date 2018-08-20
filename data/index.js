require('dotenv').config();

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const request = require('request');
const { Location } = require('./models/location');
const { geocodeLocation, getTimezone } = require('./geo');

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
// const db = mongoose.connection;

// db.on('error', error => console.error(`Failed to connect to the DB: ${error.message}`));
// db.once('open', () => {
//   console.log('All connected!');

//   const baseDir = './results';

//   fs.readdir(baseDir, (err, files) => {
//     if (err) {
//       console.error(`Failed to grab files from ./results: ${err.message}`);
//       return;
//     }

//     files.forEach( function(file) {
//       const fullPath = path.resolve(baseDir, file);
//       const locations = JSON.parse(fs.readFileSync(fullPath));

//       console.log(`processing ${fullPath} - ${locations.length} locations`);

//       Location.insertMany(locations, (error, docs) => {
//         if (error) {
//           console.error(`Failed to insert locations for ${file}: ${error.message}`);
//         } else {
//           console.log(`Locations inserted for ${file}`);
//         }
//       });
//     });
//   });
// });

geocodeLocation('Japan', [
  "Yasugi",
  "Simane",
  "Japan"
]).then(location => {
  console.log('got geo', location)
  getTimezone(location.lat, location.lng).then(tz => {
    console.log('Got tz', tz)
  })
}).catch(error => {
  console.error('geo fuck', error)
})


process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));
