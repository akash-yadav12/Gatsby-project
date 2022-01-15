import React from "react"

import PropTypes from "prop-types"

import Header from "./Header"
import "bulma/css/bulma.min.css"

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <footer className="footer">
        <div className="has-text-centered">
          Copyright @{new Date().getFullYear()} Gatsby X Graphql
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}
