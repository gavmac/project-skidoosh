import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

const token = localStorage.getItem('token');

const { NODE_ENV, REACT_APP_GRAPHQL_URI } = process.env;
const isNotProduction = NODE_ENV !== 'production';
const uri = isNotProduction ? 'http://localhost:4000/graphql' : REACT_APP_GRAPHQL_URI;

// 2
const Link = createUploadLink({
    uri: {uri},
    headers: {
        authorization: token ? `Bearer ${token}` : ''
    }
})

export default new ApolloClient({
    link: Link,
    cache: new InMemoryCache()
})