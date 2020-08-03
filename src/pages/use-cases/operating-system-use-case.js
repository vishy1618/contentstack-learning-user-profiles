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
          variation_id
          badges {
            badge_image {
              url
            }
            badge_link {
              href
            }
            highlight_for_variant
          }
        }
      }
    }
  `);
  const personalizationReady = useContext(PersonalizationContext);

  if (!personalizationReady) {
    return null;
  }

  const storeBadgesContainer = data.csOsusecase.store_badges;
  const badges = storeBadgesContainer.badges;

  const variant = Personalization.getActiveVariant(storeBadgesContainer.variation_id);

  return (
    <Layout>
      <SEO title="Operating Systems Use Case" />
      <div>
        <h1>Download Legends of Runeterra now!</h1>
        {
          badges
            .sort((badge1, _) => {
              if (badge1.highlight_for_variant === variant) {
                return -1;
              } else {
                return 1;
              }
            })
            .map(storeBadge => {
              const height = storeBadge.highlight_for_variant === variant ? 120 : 50;
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