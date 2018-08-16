import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'

class SpotLink extends Component {
  render() {
    const {
      id,
      objectID,
      city,
      state,
      country,
      countrySlug,
      citySlug,
      stateSlug,
    } = this.props.spot;

    return (
      <Link 
        as={`/tides/${id || objectID}`} 
        href={`/tides?citySlug=${citySlug}&stateSlug=${stateSlug}&countrySlug=${countrySlug}`}
      >
        <a>{city}, {state}, {country}</a>
      </Link>
    );
  }
}

SpotLink.propTypes = {
  spot: PropTypes.shape({
    id: PropTypes.string,
    objectID: PropTypes.string,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    countrySlug: PropTypes.string.isRequired,
    citySlug: PropTypes.string.isRequired,
    stateSlug: PropTypes.string.isRequired,
  }).isRequired,
}

export default SpotLink;
