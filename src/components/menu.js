import AbstractComponent from "./abstract-component.js";

const createMenuElement = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" id="show-table" href="#">Table</a>
      <a class="trip-tabs__btn" id="show-stats" href="#">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuElement();
  }

  setShowTableHandler(handler) {
    this.getElement().querySelector(`#show-table`).addEventListener(`click`, () => {
      this.getElement().querySelector(`#show-table`).classList.add(`trip-tabs__btn--active`);
      handler();
    });
  }

  setShowStatsHandler(handler) {
    this.getElement().querySelector(`#show-stats`).addEventListener(`click`, () => {
      this.getElement().querySelector(`#show-stats`).classList.add(`trip-tabs__btn--active`);
      handler();
    });
  }
}
