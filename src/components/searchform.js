import React, { useState } from "react"
import { navigate } from "@reach/router"

const SearchForm = ({ initialQuery = "" }) => {
  // Create a piece of state, and initialize it to initialQuery
  // query will hold the current value of the state,
  // and setQuery will let us change it
  const [query, setQuery] = useState(initialQuery)
  // On input change use the current value of the input field (e.target.value)
  // to update the state's query value
  const handleChange = e => {
    setQuery(e.target.value)
  }

  const handleSubmit = e => {
    // prevent the default behavior on submit
    e.preventDefault()
    // When the form is submitted load the search page
    // with a query paramenter (q) equal to the state's query value
    navigate(`/search?q=${query}`)
  }

  return (
    <form role="search" onSubmit={handleSubmit}>
      <label htmlFor="search-input" style={{ display: "block" }}>
        Search for:
      </label>
      <input
        id="search-input"
        type="search"
        value={query}
        placeholder="e.g. template"
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  )
}
export default SearchForm
