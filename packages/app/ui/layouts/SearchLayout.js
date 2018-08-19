import qs from 'qs';
import _ from 'lodash';
import React from 'react'
import PropTypes from 'prop-types'
import MetaComponent from '../components/MetaComponent';
import SideBar from '../components/SideBar';
import { Container } from 'semantic-ui-react'
import { InstantSearch, instantSearchSettings } from '../../lib/instant-search'
import AlgoliaSearchBox from '../components/AlgoliaSearchBox';
import { Configure } from 'react-instantsearch/dom';
import { withRouter } from 'next/router'

class SearchLayout extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      searchState: {},
    };
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props.router.query;

    if (query !== prevProps.router.query.query) {
      this.setState({
        searchState: qs.parse(this.props.router.query)
      })
    }
  }

  onSearchStateChange(state) {
    const { router } = this.props;
    router.push(`/search?${qs.stringify(state)}`);
  }

  componentDidMount() {
    const { router } = this.props;

    if (!_.isEmpty(router.query)) {
      this.setState({
        searchState: router.query,
      })
    }
  }

  render() {
    const { children, title } = this.props;
    const { appId, apiKey } = instantSearchSettings;
    return (
      <div className="layoutWrap">
        <MetaComponent title={title} />
        <InstantSearch
          appId={appId}
          apiKey={apiKey}
          indexName='Spots'
          onSearchStateChange={this.onSearchStateChange}
          searchState={this.state.searchState}
        >
          <Configure hitsPerPage={12} />
          <SideBar>
            <AlgoliaSearchBox />
            <Container>
              {children}
            </Container>
          </SideBar>
        </InstantSearch>
      </div>
    )
  }
}

SearchLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  router: PropTypes.object.isRequired,
}

export default withRouter(SearchLayout);
