import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { HOST } from '../constants/config'

const client = new ApolloClient({
  link: new HttpLink({ uri: [HOST, '/pizza'].join('') }),
  cache: new InMemoryCache(),
})

export default client
