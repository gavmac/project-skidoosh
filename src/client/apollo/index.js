import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

const token = localStorage.getItem('token');
// 2
const httpLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
        authorization: token ? `Bearer ${token}` : ''
    }
})

export default new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})