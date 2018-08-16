import React from 'react'
import PropTypes from 'prop-types'
import MetaComponent from '../components/MetaComponent';
import SideBar from '../components/SideBar';
import SideBarStateHandler from '../components/SideBarStateHandler';
import { Icon, Container } from 'semantic-ui-react'
import { InstantSearch, instantSearchSettings } from '../../lib/instant-search'
import {
  SearchBox,
  Configure,
  Pagination,
} from 'react-instantsearch/dom';

export default class AppLayout extends SideBarStateHandler {
  render() {
    const { children, title } = this.props;
    const { appId, apiKey } = instantSearchSettings;
    return (
      <div className="layoutWrap">
        <MetaComponent title={title} />
        <SideBar
          handleButtonClick={this.handleButtonClick}
          handleSidebarHide={this.handleSidebarHide}
          visible={this.state.visible}
        >
          <Container>
            <InstantSearch
              appId={appId}
              apiKey={apiKey}
              indexName='Spots'
            >
              <Configure hitsPerPage={12} />
              <header>
                <h1>Look for spots</h1>
                <div className="searchBoxWrap">
                  <SearchBox className="ui input fluid large" />
                  <div className="sidebarButton">
                    <Icon color='grey' link name='bars' onClick={this.handleButtonClick} />
                  </div>
                </div>
              </header>
              <content>
                {children}
              </content>
              <footer>
                <Pagination />
              </footer>
            </InstantSearch>
          </Container>
        </SideBar>
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
