export default class Points {
  constructor() {
    this._events = [];

    this._dataChangeHandlers = [];

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

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
