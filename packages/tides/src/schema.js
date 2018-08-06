import gql from 'graphql-tag';

export default gql`
  type Tide {
    dt: Int!
    date: String!
    prettyTimeLabel: String!
    height: Float!
    type: String!
  }

  type Query {
    tides(lat: Float!, lon: Float!, timeZone: String!): [Tide]
  }
`;
