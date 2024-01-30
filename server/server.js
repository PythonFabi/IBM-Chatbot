const express = require('express');
// Import Apolloserver to create GraphQL a server with Express
const { ApolloServer } = require('apollo-server-express');
// imports the path module, that is used by node.js to work with directories and files
const path = require('path');
// get the authMiddleware from the utils/auth file
const { authMiddleware } = require('./utils/auth');


// graphql resolver and typeDef functions
const { typeDefs, resolvers } = require('./schemas');
// imports the database connection string from config file
const db = require('./config/connection');

// get port and express app
const PORT = process.env.PORT || 3001;
const app = express();
// create a new instance of an ApolloServer using the typeDefs, resolvers and the authMiddleware,
// to check if request has a valid jwt
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});


// middleware to parse url-encoded and json data(API requests)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

// serve client/build as static assets while in production
if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// deinfing router for the "/" endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

// Call the async function to start the server
  startApolloServer();