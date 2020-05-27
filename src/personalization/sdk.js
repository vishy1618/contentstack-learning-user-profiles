const apiURL = 'https://0c6fce4c.ngrok.io';

export class SDK {
  static apiKey;
  static attributes = {};
  static audiences;

  static async init(apiKey) {
    this.apiKey = apiKey;

    const audiencesResponse = await fetch(`${apiURL}/audiences`, {
      headers: {
        api_key: this.apiKey
      }
    });

    this.audiences = await audiencesResponse.json();
  }

  static set(attributes) {
    this.attributes = {
      ...this.attributes,
      ...attributes,
    }
  }
}