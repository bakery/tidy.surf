import React from 'react';
import _ from 'lodash';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import SpotLink from '../components/SpotLink';

export const getSpots = gql`
  query getSpots {
    spots {
      id
      city
      state
      country
      countrySlug
      citySlug
      stateSlug
    }
  }
`;

export default function ListOfSpots () {
  return (
    <Query query={getSpots}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <ul>{
            _.map(data.spots, spot => (
              <li key={spot.id}>
                <SpotLink spot={spot} />
              </li>
            ))
          }</ul>
        );
      }}
    </Query>
  );
}
