import React, { useState, useEffect } from "react"

import { gql, GraphQLClient } from "graphql-request"

import Character from "./Character.js"
import Filter from "./Filter.js"
import Pagination from "./Pagination.js"

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
      <Filter
        gender={gender}
        status={status}
        species={species}
        handleClearFilter={handleClearFilter}
        handleGenderChange={handleGenderChange}
        handleSpeciesChange={handleSpeciesChange}
        handleStatusChange={handleStatusChange}
      />
      {isLoading ? (
        <div className="has-text-centered">
          <button className="button is-loading is-white is-size-1">
            loading
          </button>
        </div>
      ) : (
        <div className="characters-wrap columns is-centered has-text-centered is-multiline my-6">
          {characters.map((ch) => (
            <Character {...ch} key={ch.id} />
          ))}
        </div>
      )}
      <Pagination
        prevPageHandler={prevPageHandler}
        nextPageHandler={nextPageHandler}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  )
}
