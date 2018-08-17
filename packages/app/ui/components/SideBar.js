import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'

export default class SideBar extends Component {
  constructor(props) {
    super(props);
  
    this.state = { visible: false };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
  }

  handleButtonClick() {
    this.setState({ visible: !this.state.visible })
  }

  handleSidebarHide() {
    this.setState({ visible: false })
  }

  render() {
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        handleButtonClick: this.handleButtonClick,
      }));
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          onHide={this.handleSidebarHide}
          vertical
          visible={this.state.visible}
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
          <Menu.Item as='a' onClick={this.handleButtonClick}>
            <Icon name='close' />
            Close
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          { childrenWithProps }
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

SideBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}