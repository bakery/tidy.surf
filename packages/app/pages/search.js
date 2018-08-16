import React from 'react'
import PropTypes from 'prop-types'
import { InstantSearch, instantSearchSettings } from '../lib/instant-search'
import {
  RefinementList,
  SearchBox,
  Hits,
  Configure,
  Pagination,
} from 'react-instantsearch/dom';
import SpotLink from '../ui/components/SpotLink';
import { Container } from 'semantic-ui-react'
import AppLayout from '../ui/layouts/App'

// resultsState={this.props.resultsState}
// onSearchStateChange={this.props.onSearchStateChange}
// searchState={this.props.searchState}
// createURL={this.props.createURL}

const HitComponent = ({ hit }) => (
  <div className="hit">
    <div className="hit-content">
      <SpotLink spot={Object.assign({}, hit, { id: hit.objectID })} />
    </div>
  </div>
);

HitComponent.propTypes = {
  hit: PropTypes.object
}

export default function SearchPage() {
  const { appId, apiKey } = instantSearchSettings;
  return (
    <AppLayout>
      <Container>
        <InstantSearch
          appId={appId}
          apiKey={apiKey}
          indexName='Spots'
        >
          <Configure hitsPerPage={12} />
          <header>
            <h1>Look for spots</h1>
            <SearchBox className="ui input fluid large" />
          </header>
          <content>
            <menu>
              <RefinementList attribute="category" />
            </menu>
            <results>
              <Hits hitComponent={HitComponent} />
            </results>
          </content>
          <footer>
            <Pagination />
          </footer>
        </InstantSearch>
      </Container>
    </AppLayout>
  );
}
