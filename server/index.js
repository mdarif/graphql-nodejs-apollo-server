/**
 * Apollo Server

 * Apollo Server is an open-source, spec-compliant GraphQL server
 * that's compatible with any GraphQL client, including Apollo Client.
 * It's the best way to build a production-ready, self-documenting
 * GraphQL API that can use data from any source.
 * 
 * https://www.apollographql.com/docs/apollo-server/
 */

const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./schema/type-defs')
const { resolvers } = require('./schema/resolvers')

/**
 * Pass schema definition and resolvers to the
 * ApolloServer constructor
 */
const server = new ApolloServer({ typeDefs, resolvers })

// Launch the server
server.listen().then(({ url }) => {
  console.log(`Server is running... ${url}`)
})
