import React, { useState, useEffect, useRef } from "react"

import { gql, GraphQLClient } from "graphql-request"

import Character from "./Character.js"
import Filter from "./Filter.js"
import Pagination from "./Pagination.js"

export default function CharacterList() {
  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [gender, setGender] = useState("")
  const [status, setStatus] = useState("")
  const [species, setSpecies] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState("")
  const searchRef = useRef()

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
            species
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
        setFilteredCharacters(res.characters.results)
        setTotalPages(res.characters.info.pages)
      })
      .catch((_err) => setIsLoading(false))
  }, [currentPage, gender, status, species])

  const handleGenderChange = (e) => {
    if (e.target.value === "Gender") {
      setGender("")
      return
    }
    searchRef.current.value = ""
    setGender(e.target.value)
  }
  const handleStatusChange = (e) => {
    if (e.target.value === "Status") {
      setStatus("")
      return
    }
    searchRef.current.value = ""
    setStatus(e.target.value)
  }
  const handleSpeciesChange = (e) => {
    if (e.target.value === "Species") {
      setSpecies("")
      return
    }
    searchRef.current.value = ""
    setSpecies(e.target.value)
  }
  const handleClearFilter = () => {
    setSpecies("")
    setStatus("")
    setGender("")
    searchRef.current.value = ""
    setFilteredCharacters(characters)
  }

  const nextPageHandler = () => {
    searchRef.current.value = ""
    setCurrentPage((prev) => prev + 1)
  }
  const prevPageHandler = () => {
    searchRef.current.value = ""
    setCurrentPage((prev) => prev - 1)
  }

  const searchHandler = (e) => {
    const temp = []
    const searchText = e.target.value.toLowerCase().trim()
    if (searchText) {
      characters.forEach((ch) => {
        if (
          ch.name.toLowerCase().includes(searchText) ||
          ch.gender.toLowerCase().includes(searchText) ||
          ch.status.toLowerCase().includes(searchText) ||
          ch.species.toLowerCase().includes(searchText)
        ) {
          temp.push(ch)
        }
      })
      setFilteredCharacters(temp)
    } else {
      setFilteredCharacters(characters)
    }
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
      <div className="my-4">
        <input
          className="input"
          placeholder="Search By Name, gender, status and species"
          type="text"
          ref={searchRef}
          onChange={searchHandler}
        />
      </div>
      {isLoading ? (
        <div className="has-text-centered">
          <button className="button is-loading is-white is-size-1">
            loading
          </button>
        </div>
      ) : (
        <div className="characters-wrap columns is-centered has-text-centered is-multiline my-6">
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((ch) => <Character {...ch} key={ch.id} />)
          ) : (
            <div className="title has-text-danger has-text-centered">
              No Results found
            </div>
          )}
        </div>
      )}
      {filteredCharacters.length > 0 && (
        <Pagination
          prevPageHandler={prevPageHandler}
          nextPageHandler={nextPageHandler}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </div>
  )
}
