import AbstractComponent from "./abstract-component.js";

const createPicElements = (src, imgAmount) => {
  let pics = ``;

  for (let i = 0; i < imgAmount; i++) {
    pics += `<img class="event__photo" src="${src}${Math.random()}" alt="Event photo">\n`;
  }

  return pics;
};

const createDescriptionElement = ({info, src, imgAmount}) => {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${info}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPicElements(src, imgAmount)}
        </div>
      </div>
    </section>`
  );
};

export default class Description extends AbstractComponent {
  constructor({info, src, imgAmount}) {
    super();

    this._data = {info, src, imgAmount};
  }

  getTemplate() {
    return createDescriptionElement(this._data);
  }
}
