/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React, {
  useEffect,
  useState
} from "react"

import Personalization from "personalization-sdk-js"

// You can delete this file if you're not using it
import { IpLocation } from "./ip-location"
import { PersonalizationContext } from "./src/personalization-context"

export const wrapRootElement = ({ element }) => {
  return <Wrapper element={element} />
}

const Wrapper = ({ element }) => {
  const [personalizationReady, setPersonalizationReady] = useState(false);

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
      setPersonalizationReady(true);
    }
    personalize();
  });

  return (
    <PersonalizationContext.Provider value={personalizationReady}>
      {element}
    </PersonalizationContext.Provider>
  );
}
