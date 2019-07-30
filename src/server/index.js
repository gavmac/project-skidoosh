import dotenv from 'dotenv';
import mongoose from 'mongoose';
import schema from './graphql';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

dotenv.config({ silent: true })
const uri = process.env.mongoURI;
const PORT = process.env.PORT || 4000;

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${uri}`));


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

app.listen( process.env.PORT || 4000, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
);