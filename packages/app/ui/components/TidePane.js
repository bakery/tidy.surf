import React from 'react';
import PropTypes from 'prop-types'
import { Tab, Grid } from 'semantic-ui-react'

export default class TidePane extends React.Component {
  render() {
    const {
      data,
      currentTide,
      currentTime,
    } = this.props;

    return (
      <Tab.Pane attached='bottom'>
        <section>
          <p className="prettyDate"><b>{data[0].prettyDateTimeLabel} {currentTime ? currentTime.prettyTimeLabel : null}</b></p>
          <p className="currentTide">
          {
            currentTide ? 
              currentTide.type === 'Rising' ? 
                `${currentTide.type} ↑` :
                `${currentTide.type} ↓`
              : null
          }
          </p>
          <Grid columns={data.length}>
            <Grid.Row>
              {data.map(({ dt, prettyTimeLabel, height, type }) => (
                <Grid.Column key={dt}>
                  <div className={type === 'High' ? 'highTide' : 'lowTide'}>
                    {prettyTimeLabel}
                    <hr/>
                    {height}m
                  </div>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </section>
      </Tab.Pane>
    )
  }
}

TidePane.propTypes = {
  data: PropTypes.array.isRequired,
  currentTide: PropTypes.object,
  currentTime: PropTypes.object,
}