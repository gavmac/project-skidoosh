import Server from "../graphql";

const express = require('express');
const app = express();


Server.applyMiddleware({ app });

app.listen({ port: 3000 }, () =>
    console.log(`🚀 Server ready at http://localhost:3000${Server.graphqlPath}`)
);
