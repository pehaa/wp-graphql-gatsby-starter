import React, { useState } from "react"
import { Link } from "gatsby"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
const GET_RESULTS = gql`
  query($search: String, $after: String = "") {
    posts(first: 10, after: $after, where: { search: $search }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
        title
        excerpt
      }
    }
  }
`
const SearchQuery = ({ search = "" }) => {
  const [loadingMore, setLoadingMore] = useState(false)
  const { data, loading, error, fetchMore } = useQuery(GET_RESULTS, {
    variables: { search },
  })
  const loadMore = () => {
    // loadingMore started
    setLoadingMore(true)
    if (data.posts.pageInfo.hasNextPage) {
      const after = data.posts.pageInfo.endCursor
      fetchMore({
        variables: { after },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // loadingMore is done
          setLoadingMore(false)
          return {
            posts: {
              pageInfo: {
                hasNextPage: fetchMoreResult.posts.pageInfo.hasNextPage,
                endCursor: fetchMoreResult.posts.pageInfo.endCursor,
                __typename: previousResult.posts.pageInfo.__typename,
              },
              nodes: [
                ...previousResult.posts.nodes,
                ...fetchMoreResult.posts.nodes,
              ],
              __typename: previousResult.posts.__typename,
            },
          }
        },
      })
    }
  }
  if (loading) return <p>Searching posts...</p>
  if (error) return <p>Error - {error.message}</p>
  return (
    <>
      {!data.posts.nodes.length && <p>Nothing found</p>}
      {data.posts.nodes.map(post => {
        return (
          <article key={post.slug}>
            <h2 style={{ marginBottom: 0 }}>
              <Link to={`/${post.slug}`}>{post.title}</Link>
            </h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </article>
        )
      })}
      {/* when the query is loading the button is not available */}
      {!loadingMore && data.posts.pageInfo.hasNextPage && (
        <button type="button" onClick={loadMore}>
          Load More
        </button>
      )}
      {/* let users know that the data is coming */}
      {loadingMore && data.posts.pageInfo.hasNextPage && <p>Loading...</p>}
    </>
  )
}
export default SearchQuery
