import Spots from './data'
import _ from 'lodash'
import { makeId } from '../lib/helpers';

export default {
  Spot: {
    id: (spot) => makeId(spot)
  },
  Query: {
    spots: () => Spots,
    spotById: (root, { id }) => _.find(Spots, s => id === makeId(s))
  },
};
