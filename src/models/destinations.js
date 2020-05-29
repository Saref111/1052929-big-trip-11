export default class Destinations {
  constructor(destinations) {
    this._destinations = destinations;
  }

  get destinations() {
    return this._destinations;
  }

  includesPlace(place) {
    return this._destinations.some((it) => it.name === place);
  }

  getInfo(place) {
    return this._destinations.find((it) => it.name === place);
  }
}
