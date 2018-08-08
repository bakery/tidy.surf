/* globals module: false */

import React from 'react'
import { storiesOf } from '@storybook/react'
import SpotLink from '../ui/components/SpotLink'

storiesOf('SpotLink', module).add('links to a spot', () => {
  const spot = {
    id: 'lisbon-lisbon-portugal',
    city: 'Lisbon',
    state: 'Lisbon',
    country: 'Portugal',
    countrySlug: 'portugal',
    citySlug: 'lisbon',
    stateSlug: 'lisbon',
  };
  return <SpotLink spot={spot} />
})
