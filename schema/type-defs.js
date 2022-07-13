const { gql } = require('apollo-server')

/**
 * typeDefs
 * Document or documents that represent your server's GraphQL schema,
 * generated by applying the gql tag to valid Schema Definition
 * Language (SDL) strings.
 *
 * Required unless you provide schema.
 */

/**
 * Scalars
 * Scalars are equivalent to primitive data types in a programming language.
 * In GraphQL, there are five built-in scalar types:
 *
 * 'Boolean', true or false
 * 'Int', a signed 32‐bit numeric non‐fractional value
 * 'Float', a signed double‐precision fractional values
 * 'String', a sequence of UTF‐8 characters
 * 'ID', a unique identifier
 *
 */

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
  }
`

/**
 * Enumeration types
 *
 * Also called Enums, enumeration types are a special kind of 'scalar'
 * that is restricted to a particular set of allowed values.
 *
 * This allows you to:
 * 1. Validate that any arguments of this type are one of the allowed values
 * 2. Communicate through the type system that a field will always be one of a finite set of values
 */

module.exports = { typeDefs }
