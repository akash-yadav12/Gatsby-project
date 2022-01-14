/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { Link } from 'gatsby'
import "bulma/css/bulma.min.css"

export default function Header() {
  return (
    <nav className="navbar has-shadow">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item is-size-4 mx-6">Gatsby Graphql Project</Link>
      </div>
    </nav>
  )
}
