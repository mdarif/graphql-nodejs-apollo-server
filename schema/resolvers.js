const { UserList, MovieList } = require('../FakeData')
const _ = require('lodash')

/**
 * resolvers
 * A map of functions that populate data for individual schema fields.
 * Can also be an array of multiple maps that are merged.
 *
 * Required unless you provide schema.
 */

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: () => {
      return UserList
    },
    user: (parent, args) => {
      const id = args.id
      const user = _.find(UserList, { id: Number(id) })
      return user
    },

    // MOVIE RESOLVERS
    movies: () => {
      return MovieList
    },
    movie: (parent, args) => {
      const name = args.name
      const movie = _.find(MovieList, { name })
      return movie
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
