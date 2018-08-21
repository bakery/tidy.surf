import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import TideChart from './TideChart';

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
          <TideChart data={data} />
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
