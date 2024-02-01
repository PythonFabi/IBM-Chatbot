const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type Chat {
    _id: ID
    message: String
    timestamp: Date

    type: User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        chats: [Chat]
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        chats: [Chat]
        user: User
    }

    type Mutation {
        addUser(firstName: String!, lastName: String, email: String, password: String): Auth
        createChat(_id: ID!, message: String!, timestamp: Date!): Chat
        updateUser(firstName: String!, lastName: String, email: String, password: String): User
        updateChat(_id: ID!, message: String!, timestamp: Date!): Chat
        login(email: String!, password: String!): Auth
    }
 `;

module.exports = typeDefs;