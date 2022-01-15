import React from "react"

import { graphql } from "gatsby"

import PropTypes from "prop-types"

import Layout from "../components/Layout"

import "bulma/css/bulma.min.css"

export default function CharacterDetails({ data }) {
  const { name, type, created, image, location, species, status, gender } =
    data.graphqlapi.character
  return (
    <Layout>
      <div className="container my-6">
        <div className="Image has-text-centered">
          <img src={image} alt={name} />
        </div>
        <div className="details has-text-centered">
          <p className="title">Name: {name}</p>
          <p className="subtitle">Species: {species}</p>
          <p className="subtitle">Gender: {gender}</p>
          <p className="subtitle">Status: {status}</p>
          <p className="subtitle">Type: {type || "NA"}</p>
          <p className="subtitle">Location: {location.name}</p>
          <p className="subtitle">Created at: {created}</p>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query IndividualCharacter($id: ID!) {
    graphqlapi {
      character(id: $id) {
        created
        image
        gender
        species
        status
        type
        name
        location {
          name
        }
      }
    }
  }
`

CharacterDetails.propTypes = {
  data: PropTypes.object,
}
