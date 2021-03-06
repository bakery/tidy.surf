import React from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Head from 'next/head'
import Tides from './Tides'
import AppLayout from '../layouts/App'

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
          <AppLayout spot={spot}>
            <Head>
              <title key="title">Tides for {spot.city}</title>
              <meta name="description" content={`${spot.city} tide timetables and charts for the next 10 days`} key="description" />
              <meta name="keywords" content={`${spot.city} tide times,${spot.city} high tide,${spot.city} tide chart,${spot.city} tide tables,${spot.city} low tide`} key="keywords" />
            </Head>
            <Tides spot={spot} />
          </AppLayout>
        ) : null;
      }}
    </Query>
  );
}

Spot.propTypes = {
  id: PropTypes.string.isRequired
}
