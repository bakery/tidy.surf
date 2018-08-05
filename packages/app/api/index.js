import { ApolloServer, gql } from 'apollo-server-express';
import { schema, resolvers } from 'tides';

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs: schema, resolvers });

export function connect(app) {
  server.applyMiddleware({ app }); 
}
