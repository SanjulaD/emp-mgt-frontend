import { ApolloClient, InMemoryCache, HttpLink, WatchQueryFetchPolicy, DefaultOptions } from '@apollo/client';

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
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  }),
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;
