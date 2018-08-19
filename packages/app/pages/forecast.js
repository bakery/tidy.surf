import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Spot from '../ui/containers/Spot';
import ListOfSpots from '../ui/containers/ListOfSpots';

export default class Tides extends Component {
  static getInitialProps ({ query }) {
    return {
      spotId: query ? `${query.citySlug}-${query.stateSlug}-${query.countrySlug}` : null,
    }
  }

  render () {
    const { spotId } = this.props;
    return (
      <div>
        <Spot id={spotId} />
        <ListOfSpots />
      </div>
    )
  }
}

Tides.propTypes = {
  spotId: PropTypes.string
};

