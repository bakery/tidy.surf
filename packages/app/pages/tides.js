import React from 'react'
import { connectHits } from 'react-instantsearch-dom';
import SpotLink from '../ui/components/SpotLink';
import SearchLayout from '../ui/layouts/SearchLayout'
import { Grid } from 'semantic-ui-react'

const CustomHits = connectHits(({ hits }) => (
  <Grid columns={1}>
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
    <SearchLayout title='Search'>
      <CustomHits />
    </SearchLayout>
  );
}
