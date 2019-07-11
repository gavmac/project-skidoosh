import { ApolloServer } from 'apollo-server-express';

import typeDefs from "./types/";
import resolvers from "./resolvers/";

// GraphQL: Schema
const Server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,

    playground: {
        endpoint: `http://localhost:3000/graphql`,
        settings: {
            'editor.theme': 'light'
        }
    }
});
// Exports
export default Server;