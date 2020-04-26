import AbstractComponent from "./abstract-component.js";

const createListItemForFormElement = () => {
  return (
    `<li class="trip-events__item"></li>`
  );
};

export default class EventListItem extends AbstractComponent {
  getTemplate() {
    return createListItemForFormElement();
  }
}
