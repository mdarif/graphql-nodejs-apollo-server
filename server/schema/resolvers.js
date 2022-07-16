const { UserList, MovieList } = require('../FakeData')
const _ = require('lodash')

/**
 * resolvers
 * A resolver is a function that's responsible for populating the data for a
 * single field in your schema.
 * It can populate that data in any way you define, such as by fetching data
 * from a back-end database or a third-party API.
 *
 * Note: If you don't define a resolver for a particular field, Apollo Server
 * automatically defines a default resolver for it.
 *
 * https://www.apollographql.com/docs/apollo-server/data/resolvers
 */

// Resolver map
const resolvers = {
  Query: {
    // USER RESOLVERS
    users: () => {
      return UserList
    },
    user: (parent, args) => {
      /**
       * args
       * The args argument is an object that contains all GraphQL arguments
       * that were provided for the field by the GraphQL operation.
       *
       * For example, when executing query{ user(id: "4") },
       * the args object passed to the user resolver is { "id": "4" }
       */
      const { id } = args
      const user = _.find(UserList, { id: Number(id) })
      return user
    },

    // MOVIE RESOLVERS
    movies: () => {
      return MovieList
    },
    movie: (parent, args) => {
      const { name } = args
      const movie = _.find(MovieList, { name })
      return movie
    }
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input
      const lastId = UserList[UserList.length - 1].id
      user.id = lastId + 1
      UserList.push(user)
      return user
    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input
      let updatedUser
      UserList.forEach(user => {
        if (user.id === Number(id)) {
          user.username = newUsername
          updatedUser = user
        }
      })

      return updatedUser
    },
    deleteUser: (parent, args) => {
      const { id } = args
      _.remove(UserList, user => user.id === Number(id))
      return null
    }
  },

  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        movie =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      )
    }
  }
}

module.exports = { resolvers }
