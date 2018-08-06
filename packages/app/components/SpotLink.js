import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'

class SpotLink extends Component {
  render() {
    const {
      countrySlug,
      citySlug,
      stateSlug,
    } = this.props;

    return (
      <Link 
        as={`/tides/${citySlug}-${stateSlug}-${countrySlug}`} 
        href={`/tides?citySlug=${citySlug}&stateSlug=${stateSlug}&countrySlug=${countrySlug}`}
      >
        <a>Tides</a>
      </Link>
    );
  }
}

SpotLink.propTypes = {
  countrySlug: PropTypes.string.isRequired,
  citySlug: PropTypes.string.isRequired,
  stateSlug: PropTypes.string.isRequired,
}

export default SpotLink;
