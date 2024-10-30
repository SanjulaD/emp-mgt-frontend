'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { ApolloWrapper } from '../app/ApolloWrapper';

export const Providers = ({ children }: { children: any }) => {
  return (
    <ApolloWrapper>
      <Provider store={store}>{children}</Provider>
    </ApolloWrapper>
  );
};
