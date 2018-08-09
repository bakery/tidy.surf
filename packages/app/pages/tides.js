import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Spot from '../ui/components/Spot'
import ListOfSpots from '../ui/components/ListOfSpots';

export default class Tides extends Component {
  static getInitialProps ({ query }) {
    return {
      spotId: query ? `${query.citySlug}-${query.stateSlug}-${query.countrySlug}` : null,
    }
  }

  render () { 
    const { spotId } = this.props;

    if (!spotId) {
      return (<ListOfSpots />)
    }

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

