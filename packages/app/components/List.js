import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

function List ({
  data: { loading, error, books },
  loadMorePosts
}) {
  if (error) {
    return <strong>Error</strong>;
  }

  if (books && books.length) {
    return (
      <section>
        <ul>
          {books.map((book, index) => (
            <li key={book.title}>
              {book.title} by {book.author}
            </li>
          ))}
        </ul>
      </section>
    )
  }
  
  return <div>Loading</div>
}

export const allBooks = gql`
  query allBooks {
    books {
      title
      author
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(allBooks, {
  props: ({ data }) => {
    return ({
      data,
    })
  }
})(List)
