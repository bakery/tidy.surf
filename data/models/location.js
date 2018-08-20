const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  city: String,
  country: String,
  countryCode: String,
  timezone: String,
  locationParts: [String],
  lat: Number,
  lng: Number,
});

const Location = mongoose.model('Location', locationSchema);

module.exports = {
  Location
}
