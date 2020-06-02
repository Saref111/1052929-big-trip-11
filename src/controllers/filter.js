import FilterComponent from "../components/filter.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {getEventsByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class FilterController {
  constructor(container, model) {
    this._container = container;
    this._model = model;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent = null;
  }


  joinSort(sortComponent) {
    this._sortComponent = sortComponent;
  }


  render() {
    const container = this._container;
    const allEvents = this._model.getAllEvents();
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

  onNewEventChange() {
    this._onFilterChange(FilterType.EVERYTHING);
  }

  _onDataChange() {
    this.render();
  }

  _onFilterChange(filterType) {
    this._model.setFilter(filterType);
    this._activeFilterType = filterType;
    this._sortComponent.rerender();
  }
}
