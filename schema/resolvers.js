const { UserList } = require('../FakeData')

/**
 * resolvers
 * A map of functions that populate data for individual schema fields.
 * Can also be an array of multiple maps that are merged.
 *
 * Required unless you provide schema.
 */

const resolvers = {
  Query: {
    users () {
      return UserList
    }
  }
}

module.exports = { resolvers }
