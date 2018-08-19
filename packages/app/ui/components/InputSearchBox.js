import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Icon, Container, Input } from 'semantic-ui-react'
import Router from 'next/router'

const navigateToSearchPage = (query) =>
  Router.push({
    pathname: '/search',
    query: { query }
  })


export default class InputSearchBox extends Component {
  constructor() {
    super();

    this.state = {
      query: null
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
    const {
      handleButtonClick,
    } = this.props;
    return (
      <header>
        <Container>
          <div className="searchBoxWrap">
            <Input
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange} 
              type='search'
              icon='search'
              size='large'
              fluid
              placeholder='Search...'
            />
            <div className="sidebarButton">
              <Icon color='grey' link name='bars' onClick={handleButtonClick} />
            </div>
          </div>
        </Container>
      </header>
    );
  }
}

InputSearchBox.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
}