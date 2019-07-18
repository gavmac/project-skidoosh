const { gql } = require('apollo-server-express');

export default gql `
  type User {
        id: ID!
        userName: String
        email: String
    }
    type Query {
        hello: String
        getUsers: [User]
    }
    type Mutation {
        addUser(userName: String!, email: String!): User
    }
`;


