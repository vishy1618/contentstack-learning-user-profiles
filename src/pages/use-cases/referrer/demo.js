import React, {
  useContext,
  useState
} from "react"

import {
  graphql,
  useStaticQuery
} from "gatsby"
import Personalization from "personalization-sdk-js"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import { PersonalizationContext } from "../../../personalization-context"

const Demo = () => {
  const [cartVisibility, showCart] = useState(false);

  const data = useStaticQuery(graphql`
    query ReferrerQuery {
      csReferralsusecase {
        coupon_for_referrals {
          coupon_code
          referred_audience {
            _id
          }
        }
      }
    }
  `);
  const personalizationReady = useContext(PersonalizationContext);

  if (!personalizationReady) {
    return null;
  }

  const referralCoupons = data.csReferralsusecase.coupon_for_referrals;
  let prefilledCouponCode = '';

  for (const referralCoupon of referralCoupons) {
    if (Personalization.isAudienceActive(referralCoupon.referred_audience._id)) {
      prefilledCouponCode = referralCoupon.coupon_code;
    }
  }
  const couponInputStyle = prefilledCouponCode ? {color: 'green', fontWeight: 'bold', fontFamily: 'helvetica'} : {};

  let shoppingCart = cartVisibility ?
      <div style={{marginTop: '20px'}}>
        <h2>Shopping Cart</h2>
        <ul>
          <li style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>1 Shirt</span>
            <span><b>$50</b></span>
          </li>
          <li style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>2 Pants</span>
            <span><b>$100</b></span>
          </li>
          <hr/>
          <li style={{display: 'flex', justifyContent: 'space-between'}}>
            <span><b>Total</b></span>
            <span><b>{prefilledCouponCode ? <span>$90 <strike>$150</strike></span> : '$150'}</b></span>
          </li>
        </ul>

        <div>
          <h3>Coupon Code</h3>
          <input defaultValue={prefilledCouponCode} style={couponInputStyle}></input>
          <span style={{color: 'green', fontWeight: 'bold', fontFamily: 'helvetica'}}>
            {prefilledCouponCode ? ' 40% OFF!' : ''}
          </span>
        </div>
      </div> :
      null;

  return (
    <Layout>
      <SEO title="Referrer Use Case Demo" />
      <header style={{background: 'lightgrey none repeat', padding: '15px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span style={{color: 'black', fontSize: '2.5rem', fontFamily: 'helvetica', lineHeight: '3rem'}}>
            The Apparel Company
          </span>
          <span
            style={{borderRadius: '10px', border: '2px solid', padding: '10px', color: 'black', cursor: 'pointer'}}
            onClick={showCart}
          >
            Cart (2) <i>&#128722;</i>
          </span>
        </div>
      </header>
      {shoppingCart}
    </Layout>
  )
}

export default Demo;