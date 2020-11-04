import React, { useContext } from "react"

import {
  graphql,
  useStaticQuery
} from "gatsby"
import Img from "gatsby-image"
import Personalization from "personalization-sdk-js"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import { PersonalizationContext } from "../../../personalization-context"

const Demo = () => {
  const data = useStaticQuery(graphql`
    query {
      usFlag: file(relativePath: { eq: "usflag.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      indiaFlag: file(relativePath: { eq: "indiaflag.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const usFlag = <Img fluid={data.usFlag.childImageSharp.fluid} />;
  const indiaFlag = <Img fluid={data.indiaFlag.childImageSharp.fluid} />;

  const personalizationReady = useContext(PersonalizationContext);

  if (!personalizationReady) {
    return null;
  }

  const usAudienceId = '5f9bc7d207f21100123863af';
  const indianAudienceId = '5f9bc7ef07f21100123863b0';
  let flag;

  if (Personalization.isAudienceActive(usAudienceId)) {
    flag = usFlag;
  } else if (Personalization.isAudienceActive(indianAudienceId)) {
    flag = indiaFlag;
  }

  return (
    <Layout>
      <SEO title="Location demo" />
      <h1>Location demo</h1>
      {
        flag ?
          <div>
            You are visiting from:
            {flag}
          </div> :
          <div>
            We're not sure where you're visiting from.
          </div>
      }
    </Layout>
  )
}

export default Demo;