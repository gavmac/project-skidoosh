const { gql } = require('apollo-server-express');

export default gql `
    type User {
      name: String
      id: ID!
      email: String
      password: String
      jwt: String
    }
    
    type AuthPayload {
      token: String
      user: User
    }
    
    type Query {
        currentUser: User
        getUsers: [User]
       
    }
    
    type Mutation {
        addUser(name: String, email: String!): User
        login(email: String!, password: String!): User
        signup(name: String!, email: String!, password: String!): User
    }
`;


