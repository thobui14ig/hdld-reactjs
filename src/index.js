import React from 'react';
import ReactDOM, { render } from 'react-dom';

import App from './App.js';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  cache: new InMemoryCache()
});






ReactDOM.render(
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('app'),
  )

);

