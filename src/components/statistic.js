import AbstractComponent from "./abstract-component.js";
import {render, RenderPosition} from "../utils/render.js";

const createStatisticTemplate = () => {
  return (`<section class="statistics visually-hidden">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`);
};
export default class Statistic extends AbstractComponent {
  constructor(model) {
    super();

    this._model = model;
    this._container = null;
  }

  getTemplate() {
    return createStatisticTemplate(this._model);
  }

  render() {
    this.container = document.querySelector(`.page-main`).querySelector(`.page-body__container`);
    render(this.container, this, RenderPosition.BEFOREEND);
  }
}
