import React from "react"

import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const ReferrerUseCase = () => {
  return (
    <Layout>
      <SEO title="Referrer Use Case" />
      <p>
        The demo is an e-commerce apparels website. There is a cart with some items added. If
        you come to the website through the first link, cart checkout will present you with a blank
        text field to enter coupon codes. With the second link, you are coming through a known referrer, and
        hence the cart checkout page will be prefilled with the corresponding coupon code.
      </p>
      <ol>
        <li>
          <Link to="/use-cases/referrer/demo">Website without referral</Link>
        </li>
        <li>
          <a href="https://coupon-central.vercel.app/">Referral Website</a>
        </li>
      </ol>
    </Layout>
  )
}

export default ReferrerUseCase;