export default `
  type Tide {
    dt: Int!
    date: String!
    prettyTimeLabel: String!
    day: Int!
    month: Int!
    year: Int!
    height: Float!
    type: String!
  }

  type CurrentTide {
    type: String!
    dt: Int!
  }

  type TideForecastBreakdown {
    today: [Tide]
    tomorow: [Tide]
    allTides: [Tide]
    currentTide: CurrentTide
  }

  type LocalTime {
    timezone: String!
    hours: Int!
    minutes: Int!
    prettyTimeLabel: String!
  }

  type TideForecast {
    currentTime: LocalTime!
    spot: Spot!
    tides: TideForecastBreakdown!
  }

  extend type Query {
    tides(spotId: ID!): TideForecast
  }
`;