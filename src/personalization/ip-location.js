export class IpLocation {
  static async getLocationInfo() {
    const response = await fetch('http://free.ipwhois.io/json/');
    return response.json();
  }
}