import App, { Container } from 'next/app';
import React from 'react';
import withApolloClient from '../lib/with-apollo';
import { ApolloProvider } from 'react-apollo';
import 'semantic/dist/semantic.min.css'
import Head from 'next/head'

class MyApp extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <div className="base">
        <Head>
          <link rel='stylesheet' href='/_next/static/style.css' />
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css' />
        </Head>
        <ApolloProvider client={apolloClient}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </ApolloProvider>
      </div>
    )
  }
}

export default withApolloClient(MyApp)
