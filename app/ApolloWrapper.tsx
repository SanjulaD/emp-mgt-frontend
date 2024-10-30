import { ApolloNextAppProvider, ApolloClient } from '@apollo/experimental-nextjs-app-support';
import { client } from '@graphql/client';

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const createApolloClient = (): ApolloClient<any> => {
    return client();
  };

  return <ApolloNextAppProvider makeClient={createApolloClient}>{children}</ApolloNextAppProvider>;
}
