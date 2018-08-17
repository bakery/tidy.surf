import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Icon, Container, Input } from 'semantic-ui-react'

export default class InputSearchBox extends Component {
  render() {
    const {
      handleButtonClick,
    } = this.props;
    return (
      <header>
        <Container>
          <div className="searchBoxWrap">
            <Input icon='search' size='large' fluid placeholder='Search...' />
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