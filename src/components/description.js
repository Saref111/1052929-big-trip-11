import AbstractComponent from "./abstract-component.js";

const createPicElements = (pictures) => {
  let pics = ``;

  pictures.forEach((pic) => {
    pics += `<img class="event__photo" src="${pic.src}" alt="${pic.destination}">\n`;
  });


  return pics;
};

const createDescriptionElement = (description, pictures) => {

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPicElements(pictures)}
        </div>
      </div>
    </section>`
  );
};

export default class Description extends AbstractComponent {
  constructor(description, pictures) {
    super();

    this._description = description;
    this._pictures = pictures;
  }

  getTemplate() {
    return createDescriptionElement(this._description, this._pictures);
  }
}
