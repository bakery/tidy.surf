import React from 'react'
import { RefinementList } from 'react-instantsearch/dom';
import { connectHits } from 'react-instantsearch-dom';
import SpotLink from '../ui/components/SpotLink';
import SearchLayout from '../ui/layouts/SearchLayout'
import { Grid } from 'semantic-ui-react'

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
  return (
    <SearchLayout>
      <menu>
        <RefinementList attribute="category" />
      </menu>
      <results>
        <CustomHits />
      </results>
    </SearchLayout>
  );
}
