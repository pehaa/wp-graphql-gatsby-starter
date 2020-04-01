import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Menu from "./menu"
import SearchForm from "./searchform"

import ThemeContext from "../context/ThemeContext"

const Header = ({ siteTitle, displaySearchFormInHeader }) => (
  <ThemeContext.Consumer>
    {theme => (
      <div
        style={{
          background: `rebeccapurple`,
          marginBottom: `1.45rem`,
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1.45rem 1.0875rem`,
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>

          <Menu />
          {displaySearchFormInHeader && <SearchForm />}

          <button className="dark-switcher" onClick={theme.toggleDark}>
            {theme.dark ? <span>☀</span> : <span>☾</span>}
          </button>
        </div>
      </div>
    )}
  </ThemeContext.Consumer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
