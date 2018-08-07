const apollo = require('apollo-server-express');
const Tides = require('tides');

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new apollo.ApolloServer({
  typeDefs: Tides.schema,
  resolvers: Tides.resolvers,
  playground: {
    settings: {
      'editor.theme': 'light',
      'editor.cursorShape': 'line' // possible values: 'line', 'block', 'underline'
    },
  },
});

module.exports = {
  connect: function connectAPI(app) {
    server.applyMiddleware({ app: app }); 
  }
};
