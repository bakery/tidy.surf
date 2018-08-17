import React from 'react';
import PropTypes from 'prop-types'
import * as d3 from 'd3';
import { Tab, Grid } from 'semantic-ui-react'

export default class TidePane extends React.Component {
  render() {
    const {
      data,
      currentTide,
      currentTime,
    } = this.props;

    //The data for our line
    var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                     { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                     { "x": 80,  "y": 5},  { "x": 100, "y": 60}];

    //This is the accessor function we talked about above
    var lineFunction = d3.svg.line()
                             .x(function(d) { return d.x; })
                             .y(function(d) { return d.y; })
                             .interpolate("monotone");

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
        <section>
          <svg>
            <path
              strokeWidth={2}
              stroke="white"
              fill="none"
              d={`${lineFunction(lineData)}`}
            />
          </svg>
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