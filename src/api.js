import Point from "./models/point.js";

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getEvents() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/points/`, {headers})
      .then((response) => response.json())
      .then(Point.parsePoints);
  }
}
