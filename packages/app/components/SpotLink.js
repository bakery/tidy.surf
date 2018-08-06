import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'

import { slugify } from '../lib/helpers';

class SpotLink extends Component {
  render() {
    const {
      countrySlug,
      citySlug,
      state,
    } = this.props;

    return (
      <Link
        as={`/tides/${citySlug}-${slugify(state)}-${countrySlug}`}
        href={`/tides?citySlug=${citySlug}&${countrySlug}`}
      >
        <a>Tides</a>
      </Link>
    );
  }
}

SpotLink.propTypes = {
  countrySlug: PropTypes.string.isRequried,
  citySlug: PropTypes.string.isRequried,
  state: PropTypes.string.isRequried,
}

export default SpotLink;
