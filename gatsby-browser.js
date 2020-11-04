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

import { PersonalizationContext } from "./src/personalization-context"

export const wrapRootElement = ({ element }) => {
  return <Wrapper element={element} />
}

const Wrapper = ({ element }) => {
  const [personalizationReady, setPersonalizationReady] = useState(false);

  useEffect(() => {
    async function personalize() {
      await Personalization.init('5f86c3b0e51a370012d3a145');

      setPersonalizationReady(true);
    }
    personalize();
  }, []);

  return (
    <PersonalizationContext.Provider value={personalizationReady}>
      {element}
    </PersonalizationContext.Provider>
  );
}
