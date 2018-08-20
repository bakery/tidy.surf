import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as d3 from 'd3'

const canvasOffset = 0.1;
const canvasWidth = 400;
const canvasHeight = 100;

export default class TideChart extends React.Component {
  render() {
    const { data } = this.props;
    console.log('data', data);
    const mindt = _.minBy(data, 'dt');
    const maxdt = _.maxBy(data, 'dt');
    const minHeight = _.minBy(data, 'height');
    const maxHeight = _.maxBy(data, 'height');

    const withPadding = d => {
      const padding = [{
        dt: mindt.dt - 6 * 3600,
        height: mindt.type === 'High' ? 0 : maxHeight.height 
      }, {
        dt: maxdt.dt + 6 * 3600,
        height: maxdt.type === 'High' ? 0 : maxHeight.height 
      }];
      return _.sortBy([...d, ...padding], 'dt');
    };
                       
    const xScale = d3.scaleLinear().domain([mindt.dt, maxdt.dt]).range(
      [canvasOffset * canvasWidth, (1 - canvasOffset) * canvasWidth]
    );
    const yScale = d3.scaleLinear().domain([minHeight.height, maxHeight.height]).range(
      [canvasOffset * canvasHeight, (1 - canvasOffset) * canvasHeight]
    );
    const points = _.map(
      withPadding(data), ({ dt, height }) => [dt, height]
    );    
    const line = d3.line().x((d) => xScale(d[0])).y((d) => yScale(d[1])).curve(d3.curveMonotoneX);
    return (
      <div>
        <svg id="canvas" viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
          <path
            className="line"
            d={line(points)}
          />
          {
            _.map(points, (p, k) => {
              return (
                <React.Fragment>
                  {
                    k < data.length ?
                      <foreignObject
                        x={xScale(p[0]) - 25}
                        y={
                          data[k].type === 'High' ?
                            yScale(p[1]) + 15 :
                            yScale(p[1]) - 30
                        }
                      >
                        <div className="dot-label">
                          <p>{data[k].prettyTimeLabel}</p>
                          <p>{data[k].type}</p>
                        </div>
                      </foreignObject> :
                      null
                  }
                  <circle className="dot" cx={xScale(p[0])} cy={yScale(p[1])} r={5} />
                </React.Fragment>
              )
            })
          }
        </svg>
      </div>
    );
  }
}

TideChart.propTypes = {
  data: PropTypes.array.isRequired,
}
