import _ from 'lodash'
import Spots from '../spots/data'
import Search from './index'

export function resyncAllSearchIndices() {
  const spotsIndex = Search.getIndex('Spots');
  return spotsIndex.addObjects(_.map(Spots, spot => {
    const { citySlug, stateSlug, countrySlug, lat, lon } = spot;
    const base = _.pick(
      spot,
      'city', 'state', 'country', 'timezone', 'citySlug', 'countrySlug', 'stateSlug'
    );

    return _.extend(base, {
      objectID: `${citySlug}-${stateSlug}-${countrySlug}`,
      _geoloc: {
        lat,
        lng: lon
      }
    })
  }))
}
