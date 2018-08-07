import _ from 'lodash';
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Spot from '../ui/components/Spot'
import ListOfSpots from '../ui/components/ListOfSpots';

export default class Tides extends Component {
  static getInitialProps ({
    query: {
      citySlug,
      stateSlug,
      countrySlug,
    }
  }) {
    return {
      spotId: `${citySlug}-${stateSlug}-${countrySlug}`
    }
  }

  render () { 
    const { spotId } = this.props;
    
    if (_.isEmpty(spotId)) {
      return (<div><h1>No spot available</h1></div>)
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

