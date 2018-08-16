import React from 'react';

export default class SideBarStateHandler extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = { visible: false };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
  }

  handleButtonClick() {
    this.setState({ visible: !this.state.visible })
  }

  handleSidebarHide() {
    this.setState({ visible: false })
  }
}
