const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query createPath {
      graphqlapi {
        characters {
          results {
            name
            id
          }
        }
      }
    }
  `)

  data.graphqlapi.characters.results.forEach((ch) => {
    actions.createPage({
      path: "/" + ch.name.split(" ")[0] + ch.id,
      component: path.resolve("./src/templates/character-details.js"),
      context: { id: ch.id },
    })
  })
}
