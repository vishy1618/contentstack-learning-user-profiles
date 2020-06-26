import React from "react"

const { default: Layout } = require("../../components/layout")
const { Link } = require("gatsby")

const UseCases = () => {
  return (
    <Layout>
      <h1>Personalization Use Cases</h1>
      <ul>
        <li>
          <Link to="/use-cases/operating-system-use-case">Device Types and Operating Systems</Link>
        </li>
        <li>
          <Link to="/use-cases/query-parameters-use-case">Query Parameters</Link>
        </li>
      </ul>
    </Layout>
  )
}

export default UseCases;
