import React, { useState, useEffect } from "react"

import { Link } from "gatsby"

import { gql, GraphQLClient } from "graphql-request"

export default function CharacterList() {
  const [characters, setCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [gender, setGender] = useState("")
  const [status, setStatus] = useState("")
  const [species, setSpecies] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState("")

  useEffect(() => {
    setIsLoading(true)
    const url = "https://rickandmortyapi.com/graphql"
    const params = {
      gender: gender,
      page: currentPage,
      species: species,
      status: status,
    }
    const query = gql`
      query getAllCharacter(
        $gender: String
        $status: String
        $species: String
        $page: Int!
      ) {
        characters(
          filter: { gender: $gender, status: $status, species: $species }
          page: $page
        ) {
          results {
            name
            image
            status
            gender
            id
          }
          info {
            pages
          }
        }
      }
    `
    const client = new GraphQLClient(url)
    client
      .request(query, params)
      .then((res) => {
        setIsLoading(false)
        setCharacters(res.characters.results)
        setTotalPages(res.characters.info.pages)
      })
      .catch((_err) => setIsLoading(false))
  }, [currentPage, gender, status, species])

  const handleGenderChange = (e) => {
    if (e.target.value === "Gender") {
      setGender("")
      return
    }
    setGender(e.target.value)
  }
  const handleStatusChange = (e) => {
    if (e.target.value === "Status") {
      setStatus("")
      return
    }
    setStatus(e.target.value)
  }
  const handleSpeciesChange = (e) => {
    if (e.target.value === "Species") {
      setSpecies("")
      return
    }
    setSpecies(e.target.value)
  }
  const handleClearFilter = () => {
    setSpecies("")
    setStatus("")
    setGender("")
  }

  const nextPageHandler = () => {
    setCurrentPage((prev) => prev + 1)
  }
  const prevPageHandler = () => {
    setCurrentPage((prev) => prev - 1)
  }

  return (
    <div className="container">
      <div className="filter-container my-6">
        <div className="subtitle">Filters:</div>
        <div className="filter is-flex">
          <div className="gender">
            <div className="select">
              <select onChange={handleGenderChange} value={gender}>
                <option selected>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
          <div className="Status">
            <div className="select">
              <select onChange={handleStatusChange} value={status}>
                <option selected>Status</option>
                <option>Alive</option>
                <option>Dead</option>
              </select>
            </div>
          </div>
          <div className="Species">
            <div className="select">
              <select onChange={handleSpeciesChange} value={species}>
                <option selected>Species</option>
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
      <div className="characters-wrap columns is-centered has-text-centered is-multiline my-6">
        {characters.map((ch) => (
          <Link
            to={"/" + ch.name.split(" ")[0] + ch.id}
            key={ch.id}
            className="column is-5 px-4"
          >
            <div className="card is-flex is-align-items-center has-text-white">
              <div className="card-image ">
                <img src={ch.image} alt={ch.name} />
              </div>
              <div className="card-content is-flex is-flex-direction-column has-text-primary">
                <p className="title is-size-5-mobile mt-2">Name: {ch.name}</p>
                <p className="subtitle is-size-6-mobile mt-2">
                  Gender: {ch.gender}
                </p>
                <p className="subtitle is-size-6-mobile mt-2">
                  Status: {ch.status}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
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
        <button className="button mx-2 is-info" onClick={nextPageHandler}>
          Next
        </button>
      </div>
    </div>
  )
}
