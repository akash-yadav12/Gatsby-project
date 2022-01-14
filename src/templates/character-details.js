import React from "react"
import Layout from '../components/Layout'
import { graphql } from "gatsby"
import "bulma/css/bulma.min.css"

export default function Character({ data }) {
  console.log(data)
  const { name, type, created, image, location, species, status, gender } =
    data.graphqlapi.character
  console.log(name, type, created, image, location, species, status)
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
        <p className="subtitle">Type: {type ? type : "NA"}</p>
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
