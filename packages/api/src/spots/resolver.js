import Spots from './data'
import _ from 'lodash'

const makeId = spot => spot && `${spot.citySlug}-${spot.stateSlug}-${spot.countrySlug}`

export default {
  Spot: {
    id: (spot) => makeId(spot)
  },
  Query: {
    spots: () => Spots,
    spotById: (root, { id }) => _.find(Spots, s => id === makeId(s))
  },
};
