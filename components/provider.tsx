'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@graphql/client';

export const Providers = ({ children }: { children: any }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
