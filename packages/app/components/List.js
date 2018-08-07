const debug = require('debug')('app');

import React from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const getTides = gql`
  query getTides($lat: Float!, $lon: Float!, $timezone: String!) {
    tides(lat: $lat, lon: $lon, timezone: $timezone) {
      dt
      date
      height
      type
    }
  }
`;

function List ({ spot }) {
  const { lat, lon, timezone } = spot;

  debug('pulling data for', lat, lon, timezone);

  return (
    <Query query={getTides} variables={{ lat, lon, timezone }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <section>
            <ul>
              {data.tides.map(({ dt, date, height, type }) => (
                <li key={dt}>
                  ({type}) - {height}m @ {date}
                </li>
              ))}
            </ul>
          </section>
        );
      }}
    </Query>
  );


  // if (error) {
  //   return <strong>Error</strong>;
  // }

  // if (tides && tides.length) {
  //   return (
  //     <section>
  //       <ul>
  //         {tides.map(({ dt, date, height, type }) => (
  //           <li key={dt}>
  //             ({type}) - {height}m @ {date}
  //           </li>
  //         ))}
  //       </ul>
  //     </section>
  //   )
  // }
  
  // return <div>Loading</div>
}

List.propTypes = {
  spot: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    timezone: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    error: PropTypes.object,
    tides: PropTypes.array,
  }),
};



export default List;