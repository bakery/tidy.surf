const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  city: String,
  country: String,
  countryCode: String,
  region: String,
  timezone: String,
  locationParts: [String],
  lat: Number,
  lng: Number,
  lastChecked: Date
});

locationSchema.query.needsLocationAndTimezoneInfo = function(name) {
  return this.where({
    lat: {
      $exists: false,
    },
    lng: {
      $exists: false,
    },
    timezone: {
      $exists: false,
    },
    lastChecked: {
      $exists: false,
    },
  });
};

const Location = mongoose.model('Location', locationSchema);

const markLocationAsChecked = (location) => {
  return Location.updateOne({ _id: location._id }, {
    $set: {
      lastChecked: new Date()
    }
  }).exec();
};

module.exports = {
  Location,
  markLocationAsChecked,
  attachGeo(location, { lat, lng, region, timezone }) {
    return Location.updateOne({ _id: location._id }, {
      $set: {
        lat,
        lng,
        timezone,
        region,
        lastChecked: new Date()
      }
    }).exec();
  }
}
