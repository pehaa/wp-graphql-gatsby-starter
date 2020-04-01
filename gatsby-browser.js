import React from "react"
import { ThemeProvider } from "./src/context/ThemeContext"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
const client = new ApolloClient({
  /* Set the endpoint for your GraphQL server */
  uri: "https://dev-gatsby-wpgraphql-starter.pantheonsite.io/graphql",
})
export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <ThemeProvider>{element}</ThemeProvider>
  </ApolloProvider>
)
