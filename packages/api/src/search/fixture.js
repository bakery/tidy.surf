import _ from 'lodash'
import Search from './index'
import Spots from '../../fixtures/locations.json'
import { slugify } from '../lib/helpers'

export function resyncAllSearchIndices() {
  const spotsIndex = Search.getIndex('Spots');
  const chunks = _.chunk(Spots, 100);

  return Promise.all(_.map(chunks, chunk => {
    return spotsIndex.addObjects(_.map(chunk, spot => {
      const { city, country, region, lat, lng } = spot;
      const citySlug = slugify(city);
      const countrySlug = slugify(country);
      const regionSlug = slugify(region);

      const base = _.pick(spot, 'city', 'region', 'country', 'timezone');

      return _.extend(base, {
        objectID: region ?  `${citySlug}-${regionSlug}-${countrySlug}` : `${citySlug}-${countrySlug}`,
        _geoloc: {
          lat,
          lng,
        }
      })
    }))
  }));
}
