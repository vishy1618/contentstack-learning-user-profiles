import React, {
  useEffect,
  useState
} from "react"

import {
  graphql,
  Link,
  useStaticQuery
} from "gatsby"
import Personalization from "personalization-sdk-js"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { IpLocation } from "../personalization/ip-location"

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
      csHomepage {
        personalized_greeting {
          greeting
          audience {
            _id
          }
        }
      }
    }
  `);
  const userProfiles = data.allCsProfile.edges.map(edge => edge.node);
  const personalizedGreetings = data.csHomepage.personalized_greeting

  const [personalizationReady, setPersonalizationReady] = useState(false);
  const [greeting, setGreeting] = useState('Hello');

  useEffect(() => {
    async function personalize() {
      const locationInfo = await IpLocation.getLocationInfo();
      const hourOfDay = new Date().getHours();
      const userAttributes = {
        ...locationInfo,
        hourOfDay,
      };
      await Personalization.init('blt2479e118d984e036');

      Personalization.set(userAttributes);

      console.log(userAttributes);
      personalizedGreetings.forEach((personalizedGreeting) => {
        if (Personalization.isAudienceActive(personalizedGreeting.audience._id)) {
          setGreeting(personalizedGreeting.greeting);
        }
      });
      setPersonalizationReady(true);
    }
    personalize();
  });

  if (!personalizationReady) {
    return null;
  }

  return (
    <Layout>
      <SEO title="Home" />
      <h1>{greeting}</h1>
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
