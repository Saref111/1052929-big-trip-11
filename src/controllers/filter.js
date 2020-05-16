import {FilterComponent} from "../components/filter.js";
import {render, replace} from "../utils/render.js";
import {getEventsByFilter} from "../utils/filter.js";
import {FilterType, RenderPosition} from "../const.js";

export default class FilterController {
  constructor(container, model) {
    this._container = container;
    this._model = model;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const container = this._container;
    const allEvents = this._model.getEvents();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getEventsByFilter(allEvents, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onDataChange() {
    this._render();
  }

  _onFilterChange(filterType) {
    this._model.setFilter(filterType);
    this._activeFilterType = filterType;
  }
}
