import React from "react"

import PropTypes from "prop-types"

export default function Pagination({
  prevPageHandler,
  nextPageHandler,
  currentPage,
  totalPages,
}) {
  return (
    <div className="Pagination mb-6 is-flex is-justify-content-center is-align-items-center">
      <button
        className="button mx-2 is-info"
        disabled={currentPage === 1}
        onClick={prevPageHandler}
      >
        Prev
      </button>
      <div className="mx-2">
        Page {currentPage} of {totalPages}
      </div>
      <button
        className="button mx-2 is-info"
        onClick={nextPageHandler}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  nextPageHandler: PropTypes.func,
  prevPageHandler: PropTypes.func,
  totalPages: PropTypes.string,
}
