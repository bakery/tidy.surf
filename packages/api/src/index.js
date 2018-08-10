import { ApolloServer } from 'apollo-server-express'

import { schema } from './schema';
export { resyncAllSearchIndices } from './search/fixture'

const server = new ApolloServer({
  schema: schema,
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


