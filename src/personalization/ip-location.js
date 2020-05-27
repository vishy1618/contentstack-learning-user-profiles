export class IpLocation {
  static async getLocationInfo() {
    const response = await fetch('https://extreme-ip-lookup.com/json/');
    return response.json();
  }
}