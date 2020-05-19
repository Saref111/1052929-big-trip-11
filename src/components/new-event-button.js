import AbstractComponent from "./abstract-component.js";

const createNewButtonTemplate = () => {
  return (`<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`);
};

export default class NewButtonComponent extends AbstractComponent {
  constructor() {
    super();

    this._handler = null;
  }

  getTemplate() {
    return createNewButtonTemplate();
  }

  setButtonHandler(handler) {
    this.getElement().addEventListener(`click`, () => {
      this._handler = handler;
      handler();
      this.disable();
    });
  }

  disable() {
    this.getElement().disable = true;
  }

  enable() {
    this.getElement().disable = false;
  }
}
