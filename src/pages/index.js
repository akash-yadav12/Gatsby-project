import React from "react"

import "bulma/css/bulma.min.css"
import CharacterList from "../components/CharacterList"
import Layout from "../components/Layout"

export default function Home() {
  return (
    <Layout>
      <CharacterList />
    </Layout>
  )
}
