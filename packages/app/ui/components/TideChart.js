import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as d3 from 'd3'

const canvasOffset = 0.1;

export default class TideChart extends React.Component {
  constructor() {
    super()

    this.state = {
      svgContainerWidth: 0,
      svgContainerHeight: 0,
    }

    this.svgContainer = React.createRef();
  }
  componentDidMount() {
    this.setState({
      svgContainerWidth: this.svgContainer.current.offsetWidth,
      svgContainerHeight: this.svgContainer.current.offsetHeight,
    })
  }
  render() {
    const { data } = this.props;
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
      [canvasOffset * this.state.svgContainerWidth, (1 - canvasOffset) * this.state.svgContainerWidth]
    );
    const yScale = d3.scaleLinear().domain([maxHeight.height, minHeight.height]).range(
      [canvasOffset * this.state.svgContainerHeight, (1 - canvasOffset) * this.state.svgContainerHeight]
    );
    const points = _.map(
      withPadding(data), ({ dt, height }) => [dt, height]
    );    
    const line = d3.line().x((d) => xScale(d[0])).y((d) => yScale(d[1])).curve(d3.curveMonotoneX);

    const d = `${line(points)} L ${this.state.svgContainerWidth} ${this.state.svgContainerHeight + 10} L 0 ${this.state.svgContainerHeight + 10}`
    return (
      <div ref={this.svgContainer}>
        <svg id="canvas" viewBox={`0 0 ${this.state.svgContainerWidth} ${this.state.svgContainerHeight}`}>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#4D6490', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: '#D8E1EA', stopOpacity:1}} />
            </linearGradient>
          </defs>
          <path
            fill="url(#grad1)"
            className="line"
            d={d}
          />
          {
            _.map(data, (p, k) => {
              return (
                <React.Fragment>
                  <foreignObject
                    x={xScale(points[k + 1][0]) - 25}
                    y={
                      p.type === 'High' ?
                        yScale(points[k + 1][1]) + 20 :
                        yScale(points[k + 1][1]) - 35
                    }
                  >
                    <div className="dot-label">
                      <p>{p.prettyTimeLabel}</p>
                      <p>{p.height}m</p>
                    </div>
                  </foreignObject>
                  <circle className="dot" cx={xScale(points[k + 1][0])} cy={yScale(points[k + 1][1])} r={5} />
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
