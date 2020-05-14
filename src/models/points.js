export default class Points {
  constructor() {
    this._events = [];

    this.updateEvent = this.updateEvent.bind(this);
  }

  getEvents() {
    return this._events;
  }

  setEvents(events) {
    this._events = [].concat(this._events, events);
  }

  updateEvent(id, newData) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    return true;
  }
}
