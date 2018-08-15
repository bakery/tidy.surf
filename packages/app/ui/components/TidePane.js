import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types'
import { Tab, Grid } from 'semantic-ui-react'

export default class TidePane extends React.Component {
  constructor() {
    super();

    this.state = {
      svgCanvasWidth: 0,
      svgCanvasHeight: 0,
      path: '',
    }

    this.svgCanvas = React.createRef();
  }
  componentDidMount() {
    const { data } = this.props;

    const canvasCenter = this.svgCanvas.offsetHeight / 2;
    console.log('canvasCenter', canvasCenter);

    let path = `M 0 ${canvasCenter}\n`;

    const totalPoints = data.length;
    const pointsDistance = parseFloat((this.svgCanvas.offsetWidth / totalPoints).toFixed(2));
    console.log('pointsDistance', pointsDistance);
    _.forEach(data, (d, k) => {
      console.log('d.height', d.height);
      const controlHandleY = d.height * 10;
      const controlHandleX = (pointsDistance * k) + (pointsDistance / 2);
      const endPointX = pointsDistance * (k + 1);
      const endPointY = canvasCenter;
      if (k===0) {
        path += `Q ${controlHandleX} ${controlHandleY}, ${endPointX} ${endPointY}\n`;
      } else {
        path += `T ${endPointX} ${endPointY}\n`;
      }
      console.log('Control Handle', controlHandleX, controlHandleY);
      console.log('end point', endPointX, endPointY);
      console.log('path', path);
    })

    this.setState({
      svgCanvasWidth: this.svgCanvas.offsetWidth,
      svgCanvasHeight: this.svgCanvas.offsetHeight,
      path,
    })
  }
  render() {
    const {
      data,
      currentTide,
      currentTime,
    } = this.props;

    return (
      <Tab.Pane  inverted color='blue' attached='bottom'>
        <style jsx>{`
          .highTide, .lowTide {
            text-align: center;
          }
          .highTide {
           padding-top: 50px;
          }

          .lowTide {
            padding-top: 100px;
          }

          .currentTide {
            position: absolute;
          }

          .prettyDate{
            color: #000000;
          }
        `}</style>
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
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <div ref={(ref) => this.svgCanvas = ref}>
                  <svg viewBox={`0 0 ${this.state.svgCanvasWidth} ${this.state.svgCanvasHeight}`}>
                    <path
                      fill="none"
                      stroke="#333333"
                      strokeWidth="3"
                      d={
                      `
                        ${this.state.path}
                      `
                      }
                    />
                  </svg>
                </div>
              </Grid.Column>
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