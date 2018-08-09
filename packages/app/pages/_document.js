import React from 'react'
import 'semantic/dist/semantic.min.css'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <link rel='stylesheet' href='/static/style.css' />
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}