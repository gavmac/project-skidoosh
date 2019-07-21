const { gql } = require('apollo-server-express');

export default gql `
    type Link {
      id: ID! @id
      description: String!
      url: String!
      postedBy: User
    }

    type User {
      id: ID! @id
      name: String!
      email: String! @unique
      password: String!
      links: [Link!]!
    }
    
    type AuthPayload {
      token: String
      user: User
    }
    
    type Query {
        hello: String
        getUsers: [User]
    }
    
    type Mutation {
        addUser(userName: String!, email: String!): User
        post(url: String!, description: String!): Link!
        signUp(email: String!, password: String!, name: String!): AuthPayload
        logIn(email: String!, password: String!): AuthPayload
    }
`;


