import React from "react"

import {
  graphql,
  useStaticQuery
} from "gatsby"
import Personalization from "personalization-sdk-js"

import Layout from "../../../components/layout"

const Demo = () => {
  const data = useStaticQuery(graphql`
    query QueryParametersQuery {
      csQueryparametersusecase {
        hero_images {
          default_hero_image {
            url
          }
          personalized_hero_images {
            audience {
              _id
            }
            hero_image {
              url
            }
          }
        }
      }
    }
  `);

  if (!Personalization.isInitialized()) {
    return null;
  }

  const heroImages = data.csQueryparametersusecase.hero_images;
  const defaultHeroImageUrl = heroImages.default_hero_image.url;
  let heroImageUrl = defaultHeroImageUrl;

  for (const personalizedHeroImage of heroImages.personalized_hero_images) {
    if (Personalization.isAudienceActive(personalizedHeroImage.audience._id)) {
      heroImageUrl = personalizedHeroImage.hero_image.url;
    }
  }

  return (
    <Layout>
      <img src={heroImageUrl} />
    </Layout>
  )
}

export default Demo;