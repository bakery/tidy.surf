import Tides from './lib/Tides'

export default {
  Query: {
    tides: (root, { lat, lon}) => Tides.getTides(lat, lon),
  },
};
