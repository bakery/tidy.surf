import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Container, Input } from 'semantic-ui-react'
import MetaComponent from '../components/MetaComponent';
import SideBar from '../components/SideBar';
import SideBarStateHandler from '../components/SideBarStateHandler';

export default class AppLayout extends SideBarStateHandler {
  render() {
    const { children, title } = this.props;
    return (
      <div className="layoutWrap">
        <MetaComponent title={title} />
        <SideBar
          handleButtonClick={this.handleButtonClick}
          handleSidebarHide={this.handleSidebarHide}
          visible={this.state.visible}
        >
          <React.Fragment>
            <header>
              <Container>
                <div className="searchBoxWrap">
                  <Input icon='search' size='large' fluid placeholder='Search...' />
                  <div className="sidebarButton">
                    <Icon color='grey' link name='bars' onClick={this.handleButtonClick} />
                  </div>
                </div>
              </Container>
            </header>
            {children}
          </React.Fragment>
        </SideBar>
        <footer>Footer</footer>
      </div>
    )
  }
}

AppLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}
