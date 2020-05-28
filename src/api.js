import Point from "./models/point.js";
import Destinations from "./models/destinations.js";
import Offers from "./models/offers.js";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then(Point.parsePoints);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then((response) => response.json())
      .then((destinations) => {
        return new Destinations(destinations);
      });
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((response) => response.json())
      .then((offers) => new Offers(offers));
  }

  updateEvent(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRaw()),
      headers: new Headers({"Content-Type": `application/json`})
    }).then(checkStatus)
      .then(((response) => response.json()))
      .then(Point.parsePoint);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  createEvent(data) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(data.toRaw()),
      headers: new Headers({"Content-Type": `application/json`})
    }).then(checkStatus)
      .then(((response) => response.json()))
      .then(Point.parsePoint);
  }
}
