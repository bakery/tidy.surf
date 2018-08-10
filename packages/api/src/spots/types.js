export default `
  type Spot {
    id: ID!
    city: String!
    state: String!
    country: String!
    timezone: String!
    lat: Float!
    lon: Float!
    citySlug: String!
    stateSlug: String!
    countrySlug: String!
  }

  extend type Query {
    spots: [Spot]
    spotById(id: ID!): Spot
  }
`;
