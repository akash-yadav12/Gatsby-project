import React from "react"

import PropTypes from "prop-types"

import Header from "./Header"
import "bulma/css/bulma.min.css"

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}
