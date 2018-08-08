import algoliasearch from 'algoliasearch'

export default {
  getIndex(indexName) {
    const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY } = process.env

    if (!ALGOLIA_APP_ID || !ALGOLIA_ADMIN_KEY) {
      throw new Error('Algolia is not configured: missing ALGOLIA_APP_ID/ALGOLIA_ADMIN_KEY or both')
    }

    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)
    return client.initIndex(indexName)
  }
}
