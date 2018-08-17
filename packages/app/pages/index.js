import React from 'react'
import MetaComponent from '../ui/components/MetaComponent'

export default function IndexPage() {
  return (
    <div>
      <MetaComponent title='Tidy Surf' />
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
  );
}
