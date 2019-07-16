const { gql } = require('apollo-server-express');

const typeDefs = gql `
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

export default typeDefs;