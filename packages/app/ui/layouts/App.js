import React from 'react'
import PropTypes from 'prop-types'
import MetaComponent from '../components/MetaComponent';
import SideBar from '../components/SideBar';
import InputSearchBox from '../components/InputSearchBox';

export default class AppLayout extends React.Component {
  render() {
    const { children, spot, title } = this.props;
    return (
      <div className="layoutWrap">
        <MetaComponent title={title} />
        <SideBar>
          <InputSearchBox query={spot && spot.city} />
          {children}
        </SideBar>
      </div>
    )
  }
}

AppLayout.propTypes = {
  title: PropTypes.string,
  spot: PropTypes.shape({
    city: PropTypes.string.isRequired
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}
