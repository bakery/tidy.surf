import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Spot from '../ui/containers/Spot';

export default class Tides extends Component {
  static getInitialProps ({ query }) {
    return {
      spotId: query ? `${query.citySlug}-${query.stateSlug}-${query.countrySlug}` : null,
    }
  }

  render () {
    const { spotId } = this.props;
    return (
      <Spot id={spotId} />
    )
  }
}

Tides.propTypes = {
  spotId: PropTypes.string
};

