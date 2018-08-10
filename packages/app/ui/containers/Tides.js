import React from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const getTides = gql`
  query($spotId: ID!) {
    tides(spotId: $spotId){
      spot {
        id
      }
      currentTime {
        timezone
        hours
        minutes
        prettyTimeLabel
      }
      tides {
        currentTide {
          type
          dt
        }
        today {
          dt
          date
          prettyTimeLabel
          day
          month
          year
          height
          type
        }
      }
    }
  }
`;

export default function Tides ({ spot }) {
  console.log('spot', spot);
  const { citySlug, stateSlug, countrySlug } = spot;
  return (
    <Query query={getTides} variables={{ spotId: `${citySlug}-${stateSlug}-${countrySlug}` }}>
      {({ loading, error, data }) => {
        console.log('error', error);
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        console.log('data', data);

        return (
          <section>
            <ul>
              {data.tides.tides.today.map(({ dt, date, height, type }) => (
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
}

Tides.propTypes = {
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
