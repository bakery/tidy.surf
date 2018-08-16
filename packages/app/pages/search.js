import React from 'react'
import { InstantSearch, instantSearchSettings } from '../lib/instant-search'
import {
  RefinementList,
  SearchBox,
  Configure,
  Pagination,
} from 'react-instantsearch/dom';
import { connectHits } from 'react-instantsearch-dom';
import SpotLink from '../ui/components/SpotLink';
import { Container, Grid } from 'semantic-ui-react'
import AppLayout from '../ui/layouts/App'

// resultsState={this.props.resultsState}
// onSearchStateChange={this.props.onSearchStateChange}
// searchState={this.props.searchState}
// createURL={this.props.createURL}

const CustomHits = connectHits(({ hits }) => (
  <Grid>
    <Grid.Row>
    {hits.map(hit =>
      <Grid.Column key={hit.objectID} mobile={16} tablet={8} computer={4}>
        <div className="ais-Hits-item">
          <SpotLink spot={Object.assign({}, hit, { id: hit.objectID })} />
        </div>
      </Grid.Column>
    )}
    </Grid.Row>
  </Grid>
))

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
             <CustomHits />
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
