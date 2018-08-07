import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolver';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  playground: {
    settings: {
      'editor.theme': 'light',
      'editor.cursorShape': 'line' // possible values: 'line', 'block', 'underline'
    },
  },
});


export function connect(app) {
  server.applyMiddleware({ app });
}
