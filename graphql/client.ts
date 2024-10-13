import { ApolloClient, InMemoryCache, HttpLink, WatchQueryFetchPolicy, DefaultOptions } from '@apollo/client';
import fetch from 'cross-fetch';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-first' as WatchQueryFetchPolicy,
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://127.0.0.1:3000/graphql',
    fetch,
  }),
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;
