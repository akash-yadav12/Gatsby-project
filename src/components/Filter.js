import React from "react"

import PropTypes from "prop-types"

export default function Filter({
  gender,
  handleGenderChange,
  status,
  handleStatusChange,
  species,
  handleSpeciesChange,
  handleClearFilter,
}) {
  return (
    <div className="filter-container my-6">
      <div className="subtitle">Filters:</div>
      <div className="filter is-flex">
        <div className="gender">
          <div className="select">
            <select onChange={handleGenderChange} value={gender}>
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>
        <div className="Status">
          <div className="select">
            <select onChange={handleStatusChange} value={status}>
              <option>Status</option>
              <option>Alive</option>
              <option>Dead</option>
            </select>
          </div>
        </div>
        <div className="Species">
          <div className="select">
            <select onChange={handleSpeciesChange} value={species}>
              <option>Species</option>
              <option>Alien</option>
              <option>Human</option>
            </select>
          </div>
        </div>
        <button className="button is-info ml-6" onClick={handleClearFilter}>
          Clear Filter
        </button>
      </div>
    </div>
  )
}

Filter.propTypes = {
  gender: PropTypes.string,
  handleClearFilter: PropTypes.func,
  handleGenderChange: PropTypes.func,
  handleSpeciesChange: PropTypes.func,
  handleStatusChange: PropTypes.func,
  species: PropTypes.string,
  status: PropTypes.string,
}
