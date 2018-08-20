import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as d3 from 'd3'

const canvasOffset = 0.1;
const canvasWidth = 400;
const canvasHeight = 100;

export default class TideChart extends React.Component {
  componentDidMount() {
    const { data } = this.props;
    const mindt = _.minBy(data, 'dt');
    const maxdt = _.maxBy(data, 'dt');
    const minHeight = _.minBy(data, 'height');
    const maxHeight = _.maxBy(data, 'height');
    const canvas = d3.select('#canvas');

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


    // draw the tide curve
    canvas.append('path').datum(points).attr('class', 'line').call(() => canvas.select('path').attr('d', line));

    // mark tide extremes with dots
    canvas.selectAll('.dot').data(points)
      .enter().append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .attr('r', 5);
  }

  render() {
    return (
      <div>
        <svg id="canvas" width={canvasWidth} height={canvasHeight} />
      </div>
    );
  }
}

TideChart.propTypes = {
  data: PropTypes.array.isRequired,
}
