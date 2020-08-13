import AbstractComponent from "./abstract-component.js";

const createNewButtonTemplate = () => {
  return (`<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`);
};

export default class NewButtonComponent extends AbstractComponent {
  constructor() {
    super();

    this._handler = null;

    this.enabled = this.enabled.bind(this);
    this._enabledHandler = this._enabledHandler.bind(this);
  }

  getTemplate() {
    return createNewButtonTemplate();
  }

  setButtonHandler(handler) {
    console.log(handler);
    this.getElement().addEventListener(`click`, () => {
      this._handler = handler;
      this._handler();
      this.disabled();
      document.addEventListener(`keydown`, this._enabledHandler);
    });
  }

  _enabledHandler(evt) {
    if (evt.keyCode === 27) {
      this.enabled();
    }
  }

  disabled() {
    this.getElement().disabled = true;
  }

  enabled() {
    this.getElement().disabled = false;
    document.removeEventListener(`keydown`, this._enabledHandler);
  }
}
