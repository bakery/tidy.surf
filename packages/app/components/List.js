import React from 'react';
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

function List ({
  data: { error, tides },
}) {
  if (error) {
    return <strong>Error</strong>;
  }

  if (tides && tides.length) {
    return (
      <section>
        <ul>
          {tides.map(({ dt, date, height, type }) => (
            <li key={dt}>
              ({type}) - {height}m @ {date}
            </li>
          ))}
        </ul>
      </section>
    )
  }
  
  return <div>Loading</div>
}

List.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.object,
    tide: PropTypes.array,
  }),
};

export const allBooks = gql`
  query getTides($lat: Float!, $lon: Float!) {
    tides(lat: $lat, lon: $lon) {
      dt
      date
      height
      type
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(allBooks, {
  options: {
    variables: {
      lat: 50.34,
      lon: -4.24,
    },
  },
  props: ({ data }) => {
    return ({
      data,
    })
  }
})(List)
