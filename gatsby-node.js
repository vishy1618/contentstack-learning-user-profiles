const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const data = await graphql(`
    query ListOfProfilesQuery {
      allCsProfile {
        edges {
          node {
            id
            title
            current_title
            date_of_birth
            given_name
            surname
            total_work_experience
            url
            display_picture {
              id
              url
            }
            work_experience {
              company_name
              start_date
              end_date
              title
              summary
              tech_stack
            }
            header_backgound_color {
              color
              personalization_audience {
                _id
                name
              }
            }
          }
        }
      }
    }
  `);
  const userProfiles = data.data.allCsProfile.edges.map(edge => edge.node);
  // Iterate over all products and create a new page using a template
  // The product "handle" is generated automatically by Shopify
  userProfiles.forEach((profile) => {
    createPage({
      path: `/profiles/${profile.id}`,
      component: path.resolve(`./src/templates/profile.js`),
      context: {
        profile,
      },
    })
  })
}