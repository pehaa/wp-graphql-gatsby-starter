import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchForm from "../components/searchform"
import SearchResults from "../components/searchresults"

const SearchPage = ({ location }) => {
  // location.search.slice(1) strips leading question mark
  const params = new URLSearchParams(location.search.slice(1))
  const search = params.get("q")
  return (
    <Layout displaySearchFormInHeader={false}>
      <SEO title="Search Page" />
      <h1>Search form and results</h1>
      {/*  make sure to have what user searches for within the search-box */}
      <SearchForm initialQuery={search} />
      <div>
        <SearchResults search={search} />
      </div>
    </Layout>
  )
}
export default SearchPage
