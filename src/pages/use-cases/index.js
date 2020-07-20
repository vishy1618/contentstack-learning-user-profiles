import React from "react"

import SEO from "../../components/seo"

const { default: Layout } = require("../../components/layout")
const { Link } = require("gatsby")

const UseCases = () => {
  return (
    <Layout>
      <SEO title="Personalization Use Cases" />
      <h1>Personalization Use Cases</h1>
      <ul>
        <li>
          <Link to="/use-cases/operating-system-use-case">Device Types and Operating Systems</Link>
        </li>
        <li>
          <Link to="/use-cases/query-parameters-use-case">Query Parameters</Link>
        </li>
        <li>
          <Link to="/use-cases/referrer">Referrer</Link>
        </li>
      </ul>
    </Layout>
  )
}

export default UseCases;
