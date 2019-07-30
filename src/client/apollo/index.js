import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

const token = localStorage.getItem('token');
const PORT = process.env.PORT || 4000;


// 2
const Link = createUploadLink({
    uri: `http://localhost:${PORT}/graphql`,
    headers: {
        authorization: token ? `Bearer ${token}` : ''
    }
})

export default new ApolloClient({
    link: Link,
    cache: new InMemoryCache()
})