import { SDK } from "./sdk";

export class Audience {
  constructor(
    name,
    description,
    attribute,
    attributeValue,
  ) {
    this.name = name;
    this.description = description;
    this.attribute = attribute;
    this.attributeValue = attributeValue;
  }

  static forId(audienceId) {
    const audienceData = SDK.audiences.find((audience) => audience._id === audienceId);

    if (audienceData) {
      return new Audience(
        audienceData.name,
        audienceData.description,
        audienceData.attribute,
        audienceData.attributeValue,
      );
    }
  }

  isActive() {
    return SDK.attributes[this.attribute.key] === this.attributeValue;
  }
}
