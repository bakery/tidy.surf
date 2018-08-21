import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Icon, Input, Grid, Container } from 'semantic-ui-react';
import Router from 'next/router';

const navigateToSearchPage = (query) =>
  Router.push({
    pathname: '/tides',
    query: { query }
  })


export default class InputSearchBox extends Component {
  constructor(props) {
    super();

    this.state = {
      query: props.query || ''
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleKeyDown(e) {
    if(e.keyCode === 13 && this.state.query) {
      navigateToSearchPage(this.state.query);
    }
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  render() {
    const { handleButtonClick } = this.props;
    return (
      <Container>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Divider hidden />
            <div className="searchBoxWrap">
              <Input
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange} 
                type='search'
                icon='search'
                size='large'
                fluid
                placeholder='Search...'
                value={this.state.query}
              />
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

InputSearchBox.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
  query: PropTypes.string
}