import React from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Tides from './Tides';

export const getSpotById = gql`
  query getSpotById($id: ID!) {
    spotById(id: $id) {
      city
      state
      country
      lat
      lon
      timezone
      countrySlug
      citySlug
      stateSlug
    }
  }
`;

export default function Spot ({ id }) {
  return (
    <Query query={getSpotById} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const spot = data && data.spotById;

        return spot ? (
          <div>
            <h1>{spot.city}, {spot.state}, {spot.country}</h1>
            <Tides spot={spot} />
          </div>
        ) : null;
      }}
    </Query>
  );
}

Spot.propTypes = {
  id: PropTypes.string.isRequired
}
