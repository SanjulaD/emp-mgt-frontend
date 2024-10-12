'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import client from '@graphql/client';
import { store } from '@redux/store';

export const Providers = ({ children }: { children: any }) => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>{children}</Provider>
    </ApolloProvider>
  );
};
