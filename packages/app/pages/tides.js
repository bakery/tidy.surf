import _ from 'lodash';
import React, { Component } from 'react'
import List from '../components/List'
import { spotsList } from '../lib/spots-list';


export default class Tides extends Component {
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
    console.log('spot', this.props.spot);
    const { spot } = this.props;
    if (_.isEmpty(spot)) {
      return (<div><h1>No spot available</h1></div>)
    }

    const { city, state, country } = spot;
    return (
      <div>
        <h1>Tides in { city }, { state }, { country }</h1>
        <List />
      </div>
    )
  }
}