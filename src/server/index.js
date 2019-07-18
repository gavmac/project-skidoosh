import mongoose from 'mongoose';
import schema from './graphql';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

const url = 'mongodb://gavmac:282820g@ds147746.mlab.com:47746/jeerio';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`))

// GraphQL: Schema
const server = new ApolloServer({
    schema,

    playground: {
        endpoint: `http://localhost:4000/graphql`,
        settings: {
            'editor.theme': 'light'
        }
    }
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000`)
);