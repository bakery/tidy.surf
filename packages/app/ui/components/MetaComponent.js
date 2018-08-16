import React, { Component } from 'react';
import Head from 'next/head'
import PropTypes from 'prop-types'

export default class MetaComponent extends Component {
  render() {
    const { title } = this.props;
    return (
      <Head>
        <meta charSet="utf-8" /> 
        <meta name="viewport" content="width=device-width initial-scale=1, maximum-scale=1" />
        <title key="title">{ title }</title>
        <link rel="apple-touch-icon" sizes="57x57" href="/static/icons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/static/icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/static/icons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/static/icons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/static/icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/icons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/static/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/static/icons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/static/icons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tidy Surf - Waves, winds and tides 🏄" />
        <meta property="og:description" content="Tidy Surf is a surf forecast app for iPhone and Android. 100+ spots around the world 🌊" />
        <meta property="og:url" content="http://tidy.surf" />
        <meta property="og:image" content="http://tidy.surf/static/tidy-logo.png" />
        <meta name="twitter:card" content="app" />
        <meta name="twitter:site" content="http://tidy.surf/" />
        <meta name="twitter:description" content="Tidy Surf is a surf forecast app for iPhone and Android. 100+ spots around the world 🌊" />
        <meta name="twitter:app:name:iphone" content="Tidy Surf - Waves, winds and tides 🏄" />
        <meta name="twitter:app:id:iphone" content="1230095824" />
        <meta name="twitter:app:name:ipad" content="Tidy Surf - Waves, winds and tides 🏄" />
        <meta name="twitter:app:id:ipad" content="" />
        <meta name="twitter:app:name:googleplay" content="Tidy Surf - Waves, winds and tides 🏄" />
        <meta name="twitter:app:id:googleplay" content="com.tidy" />
        <meta name="twitter:image" content="http://tidy.surf/static/tidy-logo.png" />
        <script src="https://use.fontawesome.com/59b60adebe.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
      </Head>
    );
  }
}

MetaComponent.propTypes = {
  title: PropTypes.string,
}