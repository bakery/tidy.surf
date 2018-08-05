import React from 'react'
import Head from 'next/head'
// import List from '../components/List'

export default () => (
  <div>
    <style global jsx>{`
      html, body {
       font-family: 'Roboto', sans-serif;
       background-color: #fff;
       text-align: center;
      }
    `}</style>


    <style jsx>{`
      .outer {
       display: table;
       position: absolute;
       height: 100%;
       width: 100%;
      }

      .middle {
       display: table-cell;
       vertical-align: middle;
      }

      .inner {
       margin-left: auto;
       margin-right: auto; 
       width: 100%;
      }

      h1 {
       font-size: 50px; 
       font-weight: 800;
       margin: 30px
      }

      h2 {
       font-size: 18px;
       font-weight: 300;
       margin: 0;
       line-height: 1.5;
      }

      ul.app-stores {
       list-style: none;
       margin: 35px 0 0;
       padding: 0;
       font-size: 25px
      }

      ul.app-stores > li {
       display: inline-block;
       margin: 0 10px;
      }

      ul.app-stores > li > a {
        color: #032E65;
      }
    `}</style>
    
    <Head>
      <meta charset="utf-8" /> 
      <meta name="viewport" content="width=device-width" />
      <title>Tidy Surf - Waves, winds and tides</title>
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
    <div className="outer">
      <div className="middle">
        <div className="inner">
          <img width="100" height="100" className="logo" src="/static/tidy-logo.png" />
          <h1>Tidy Surf</h1>
          <h2>Waves, winds and tides<br />100+ surf spots around the world</h2>
          <ul className="app-stores">
            <li><a href="https://itunes.apple.com/us/app/tidy-surf/id1230095824"><i className="fa fa-apple" /></a></li>
            <li><a href="https://play.google.com/store/apps/details?id=com.tidy"><i className="fa fa-android"/></a></li> 
          </ul>
        </div>
      </div>
    </div>
  </div>
)
