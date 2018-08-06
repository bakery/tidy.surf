const debug = require('debug')('app');

import _ from 'lodash';
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'next/router'
import List from '../components/List'
import SpotLink from '../components/SpotLink';
import { spotsList } from '../lib/spots-list';

class Tides extends Component {
  static getInitialProps ({
    query: {
      citySlug,
      countrySlug,
    }
  }) {
    return {
      spot: _.find(spotsList, { citySlug, countrySlug }) || {},
    }
  }

  render () {
    debug('router', this.props.router);
    
    const { spot } = this.props;
    if (_.isEmpty(spot)) {
      return (<div><h1>No spot available</h1></div>)
    }

    const { city, state, country } = spot;
    return (
      <div>
        <h1>Tides in { city }, { state }, { country }</h1>
        <List />
        <ul>
          {
            _.map(spotsList, (s, key) => (
              <li key={key}><SpotLink countrySlug={s.countrySlug} citySlug={s.citySlug} stateSlug={s.stateSlug} /></li>
            ))
          }
        </ul>
      </div>
    )
  }
}

Tides.propTypes = {
  spot: PropTypes.shape({
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(Tides);
