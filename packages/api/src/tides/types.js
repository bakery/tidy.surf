export default `
  type Tide {
    dt: Int!
    date: String!
    prettyTimeLabel: String!
    height: Float!
    type: String!
  }

  extend type Query {
    tides(lat: Float!, lon: Float!, timezone: String!): [Tide]
  }
`;
