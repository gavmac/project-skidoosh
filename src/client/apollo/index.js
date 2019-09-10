import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

// Should really be stored in a cookie, but for this example we'll let it slide
const token = localStorage.getItem('token');
const isNotProduction = process.env.NODE_ENV !== 'production';
const uri = isNotProduction ? 'http://localhost:4000/graphql' : `${process.env.REACT_APP_GRAPHQL_URI}`;

// 2
const Link = createUploadLink({
    uri: uri,
    headers: {
        authorization: token ? `Bearer ${token}` : ''
    }
})

export default new ApolloClient({
    link: Link,
    cache: new InMemoryCache()
})