import { HttpLink, DefaultOptions } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support';

export function client() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  });

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  };

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
    defaultOptions,
  });
}
