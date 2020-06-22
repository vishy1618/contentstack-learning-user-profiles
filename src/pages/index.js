import React from "react"

import {
  graphql,
  Link,
  useStaticQuery
} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query ListOfProfilesQuery {
      allCsProfile {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `);
  const userProfiles = data.allCsProfile.edges.map(edge => edge.node);

  return (
    <Layout>
      <SEO title="Home" />
      <h2><Link to='/use-cases'>Personalization Use Cases</Link></h2>
      <h2>User profiles</h2>
      <ol>
        {
          userProfiles.map(profile => (
            <li>
              <Link to={"/profiles/" + profile.id}>{profile.title}</Link>
            </li>
          ))
        }
      </ol>
    </Layout>
  );
};

export default IndexPage
