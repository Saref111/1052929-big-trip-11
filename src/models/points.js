export default class Points {
  constructor() {
    this._points = [];
  }

  getPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = [].concat(this._points, points);
  }

  updatePoint(id, newData) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    return true;
  }
}
