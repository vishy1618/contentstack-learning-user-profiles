import React, { useContext } from "react"

import {
  graphql,
  useStaticQuery
} from "gatsby"
import Personalization from "personalization-sdk-js"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { PersonalizationContext } from "../../personalization-context"

const OperatingSystemUseCase = () => {
  const data = useStaticQuery(graphql`
    query OSUseCaseQuery {
      csOsusecase {
        store_badges {
          badge_link {
            href
          }
          badge_image {
            url
          }
          highlight_for_audience {
            _id
          }
        }
      }
    }
  `);
  const storeBadges = data.csOsusecase.store_badges;

  const personalizationReady = useContext(PersonalizationContext);

  if (!personalizationReady) {
    return null;
  }

  return (
    <Layout>
      <SEO title="Operating Systems Use Case" />
      <div>
        <h1>Download Legends of Runeterra now!</h1>
        {
          storeBadges
            .sort((badge1, _) => {
              const audienceId = badge1.highlight_for_audience._id;
              if (Personalization.isAudienceActive(audienceId)) {
                return -1;
              } else {
                return 1;
              }
            })
            .map(storeBadge => {
              const audienceId = storeBadge.highlight_for_audience._id;
              const height = Personalization.isAudienceActive(audienceId) ? 120 : 50;
              return (
                <span style={{margin: '10px'}}>
                  <a href={storeBadge.badge_link.href}>
                    <img src={storeBadge.badge_image.url} height={height} />
                  </a>
                </span>
              );
            })
        }
      </div>
    </Layout>
  )
}

export default OperatingSystemUseCase;