const { gql } = require('apollo-server')

const typeDefs = gql`

  type User {
    id: ID!
    address: String!
    name: String
  }

  type Query {
    enrollment: [User!]
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    registerUser(address: String!, name: String): User!
    enroll(id: ID!): User
  }
`
module.exports = {
  typeDefs,
}