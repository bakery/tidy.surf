import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'

export default class SideBar extends Component {
  render() {
    const {
      children ,
      handleButtonClick,
      handleSidebarHide,
      visible,
    } = this.props;
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          onHide={handleSidebarHide}
          vertical
          visible={visible}
          width='thin'
        >
          <Menu.Item as='a' href='/'>
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Item as='a' href='/tides'>
            <Icon name='tint' />
            Tides
          </Menu.Item>
          <Menu.Item as='a' href='/search'>
            <Icon name='search' />
            Search
          </Menu.Item>
          <Menu.Item as='a' onClick={handleButtonClick}>
            <Icon name='close' />
            Close
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          { children }
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

SideBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  handleButtonClick: PropTypes.func.isRequired,
  handleSidebarHide: PropTypes.func.isRequired,
  visible: PropTypes.bool,
}