const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query createPath {
      graphqlapi {
        characters {
          info {
            count
          }
        }
      }
    }
  `)
  for (let i = 1; i <= data.graphqlapi.characters.info.count; i++) {
    actions.createPage({
      component: path.resolve("./src/templates/character-details.js"),
      context: { id: i },
      path: "/" + i,
    })
  }
}
