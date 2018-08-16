import React from 'react'
import PropTypes from 'prop-types'
import {
  RefinementList,
  Hits,
} from 'react-instantsearch/dom';
import SpotLink from '../ui/components/SpotLink';
import SearchLayout from '../ui/layouts/SearchLayout'

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
  return (
    <SearchLayout>
      <menu>
        <RefinementList attribute="category" />
      </menu>
      <results>
        <Hits hitComponent={HitComponent} />
      </results>
    </SearchLayout>
  );
}
