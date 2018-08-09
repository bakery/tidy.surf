import getConfig from 'next/config'
import { createInstantSearch } from 'react-instantsearch/server'

const { InstantSearch, findResultsState } = createInstantSearch();
const { publicRuntimeConfig } = getConfig()
const instantSearchSettings = publicRuntimeConfig.algolia

export { InstantSearch, findResultsState, instantSearchSettings };
