import AbstractComponent from "./abstract-component.js";

const createDaysListElement = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DaysList extends AbstractComponent {
  getTemplate() {
    return createDaysListElement();
  }
}
