import React from "react"

import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const QueryParametersUseCase = () => {
  return (
    <Layout>
      <SEO title="Query Parameters Use Case" />
      <p>
        The demo is an e-commerce apparels website. The hero image of the website is
        personalized for BLACKFRIDAY campaign customers.
        This is conveyed through the <b>utm_campaign</b> query parameter.
      </p>
      <ol>
        <li>
          <Link to="/use-cases/query-parameters-use-case/demo">Regular Website</Link>
        </li>
        <li>
          <Link to="/use-cases/query-parameters-use-case/demo?utm_campaign=BLACKFRIDAY">With BLACKFRIDAY campaign</Link>
        </li>
      </ol>
    </Layout>
  )
}

export default QueryParametersUseCase;