import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import TidesSchema from './tides/types';
import TidesResolver from './tides/resolver';
import SpotSchema from './spots/types';
import SpotResolver from './spots/resolver';

const resolvers = merge(
  {},
  TidesResolver,
  SpotResolver
);

const Root = `
  type Query {
    dummy: String
  }
  type Mutation {
    dummy: String
  }
  type Subscription {
    dummy: String
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [
    Root,
    TidesSchema,
    SpotSchema
  ],
  resolvers,
});
