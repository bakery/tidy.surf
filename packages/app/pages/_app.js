import App, {Container} from 'next/app';
import React from 'react';
import withApolloClient from '../lib/with-apollo';
import { ApolloProvider } from 'react-apollo';
import 'semantic/dist/semantic.min.css'
import Head from 'next/head'

class MyApp extends App {
  render () {
    const {Component, pageProps, apolloClient} = this.props
    return <Container>
      <Head>
        <link rel='stylesheet' href='/_next/static/style.css' />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Container>
  }
}

export default withApolloClient(MyApp)
