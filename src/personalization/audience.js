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
    console.log('attribute key', this.attribute.key);
    console.log('attribute value', this.attributeValue);
    console.log('SDK.attributes[this.attribute.key]', SDK.attributes[this.attribute.key]);
    return SDK.attributes[this.attribute.key] === this.attributeValue;
  }
}
