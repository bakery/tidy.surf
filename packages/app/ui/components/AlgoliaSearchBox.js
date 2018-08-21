import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'react-instantsearch/dom';
import { Icon, Container, Grid } from 'semantic-ui-react'

export default class AlgoliaSearchBox extends Component {
  render() {
    const { handleButtonClick } = this.props;
    return (
      <Container>
        <Grid.Row columns={1}>
          <Grid.Column>
            <div className="searchBoxWrap">
              <SearchBox className="ui input fluid large" />
              <div className="sidebarButton">
                <Icon color='grey' link name='bars' onClick={handleButtonClick} />
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Container>
    );
  }
}

AlgoliaSearchBox.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
}
