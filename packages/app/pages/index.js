import React from 'react'
import AppLayout from '../ui/layouts/App'

export default function IndexPage() {
  return (
    <AppLayout>
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
    </AppLayout>
  );
}
