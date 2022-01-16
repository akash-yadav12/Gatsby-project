import React from "react"

import { Link } from "gatsby"

import PropTypes from "prop-types"

export default function Character({ name, image, gender, status, id }) {
  return (
    <Link to={"/" + id} className="column is-5 px-4">
      <div className="card is-flex is-align-items-center has-text-white">
        <div className="card-image ">
          <img src={image} alt={name} />
        </div>
        <div className="card-content is-flex is-flex-direction-column has-text-primary">
          <p className="title is-size-5-mobile mt-2">Name: {name}</p>
          <p className="subtitle is-size-6-mobile mt-2">Gender: {gender}</p>
          <p className="subtitle is-size-6-mobile mt-2">Status: {status}</p>
        </div>
      </div>
    </Link>
  )
}

Character.propTypes = {
  gender: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
}
