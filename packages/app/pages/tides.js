import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Spot from '../ui/components/Spot'
import ListOfSpots from '../ui/components/ListOfSpots';
import AppLayout from '../ui/layouts/App'

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
      return (<ListOfSpots />)
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
        {this.renderContent()}
      </AppLayout>
    )
  }
}

Tides.propTypes = {
  spotId: PropTypes.string
};

