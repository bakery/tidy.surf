import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Spot from '../ui/containers/Spot'
import ListOfSpots from '../ui/containers/ListOfSpots';
import AppLayout from '../ui/layouts/App'
import Head from 'next/head'

export default class Tides extends Component {
  constructor() {
    super();
    this.renderContent = this.renderContent.bind(this);
  }

  static getInitialProps ({ query }) {
    return {
      spotId: query ? `${query.citySlug}-${query.stateSlug}-${query.countrySlug}` : null,
    }
  }

  renderContent() {
    const { spotId } = this.props;
    if (!spotId) {
      return (
        <ListOfSpots />
      )
    }

    return (
      <div>
        <Spot id={spotId} />
        <ListOfSpots />
      </div>
    )
  }

  render () {
    return (
      <AppLayout>
        <Head>
          <title key="title">Tides</title>
        </Head>
        {this.renderContent()}
      </AppLayout>
    )
  }
}

Tides.propTypes = {
  spotId: PropTypes.string
};

