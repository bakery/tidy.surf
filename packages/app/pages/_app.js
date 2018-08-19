import App, { Container } from 'next/app';
import { Container as UIContainer } from 'semantic-ui-react'
import React from 'react';
import withApolloClient from '../lib/with-apollo';
import { ApolloProvider } from 'react-apollo';
import 'semantic/dist/semantic.min.css'
import Head from 'next/head'

class MyApp extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <div>
        <Head>
          <link rel='stylesheet' href='/_next/static/style.css' />
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css' />
        </Head>
        <ApolloProvider client={apolloClient}>
          <Container>
            <UIContainer>
              <Component {...pageProps} />
            </UIContainer>
          </Container>
        </ApolloProvider>
      </div>
    )
  }
}

export default withApolloClient(MyApp)
