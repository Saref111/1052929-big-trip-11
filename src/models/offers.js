export default class Offers {
  constructor(offers) {
    this._offers = offers;
  }

  get offers() {
    return this._offers;
  }

  getOffersByType(type) {
    return this._offers.find((it) => it.type === type);
  }
}
