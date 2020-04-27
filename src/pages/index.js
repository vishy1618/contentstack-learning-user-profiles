import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
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
      <h1>List of profiles</h1>
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
