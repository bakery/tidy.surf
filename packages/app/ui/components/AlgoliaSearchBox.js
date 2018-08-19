import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'react-instantsearch/dom';
import { Icon } from 'semantic-ui-react'

export default class AlgoliaSearchBox extends Component {
  render() {
    const { handleButtonClick } = this.props;
    return (
      <div className="searchBoxWrap">
        <SearchBox className="ui input fluid large" />
        <div className="sidebarButton">
          <Icon color='grey' link name='bars' onClick={handleButtonClick} />
        </div>
      </div>
    );
  }
}

AlgoliaSearchBox.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
}
