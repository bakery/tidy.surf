import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools'
import { merge } from 'lodash'

import TidesTypes from './tides/types'
import TidesResolvers from './tides/resolver'
import SpotsTypes from './spots/types'
import SpotsResolvers from './spots/resolver'

const mergedSchema = mergeSchemas({
  schemas: [
    makeExecutableSchema({ typeDefs: TidesTypes }),
    makeExecutableSchema({ typeDefs: SpotsTypes })
  ],
  resolvers: merge({}, TidesResolvers, SpotsResolvers),
})


const server = new ApolloServer({
  schema: mergedSchema,
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
