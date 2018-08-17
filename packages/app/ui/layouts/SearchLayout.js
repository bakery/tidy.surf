import React from 'react'
import PropTypes from 'prop-types'
import MetaComponent from '../components/MetaComponent';
import SideBar from '../components/SideBar';
import { Container } from 'semantic-ui-react'
import { InstantSearch, instantSearchSettings } from '../../lib/instant-search'
import AlgoliaSearchBox from '../components/AlgoliaSearchBox';
import {
  Configure,
  Pagination,
} from 'react-instantsearch/dom';

export default class SearchLayout extends React.Component {
  render() {
    const { children, title } = this.props;
    const { appId, apiKey } = instantSearchSettings;
    return (
      <div className="layoutWrap">
        <MetaComponent title={title} />
          <InstantSearch
            appId={appId}
            apiKey={apiKey}
            indexName='Spots'
          >
            <Configure hitsPerPage={12} />
            <SideBar>
              <AlgoliaSearchBox />
              <content>
                <Container>
                  {children}
                </Container>
              </content>
              <footer>
                <Pagination />
              </footer>
            </SideBar>
          </InstantSearch>
      </div>
    )
  }
}

SearchLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}
