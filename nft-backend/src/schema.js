const { gql } = require('apollo-server')

const typeDefs = gql`

  type User {
    address: String!
    name: String
    backgroundUrl: String
    avatarUrl: String
  }

  type Query {
    users: [User!]!
    user(address: String!): User
  }

  type Mutation {
    createUser(address: String!, name: String, backgroundUrl: String, avatarUrl: String): User!
    updateName(address: String!, name: String): User!
    updateImage(address: String!, backgroundUrl: String, avatarUrl: String): User!
  }
`
module.exports = {
  typeDefs,
}