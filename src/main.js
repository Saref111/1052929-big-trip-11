import {getEventObjects} from "./mock/event.js";
import {render} from "./utils/render.js";
import DaysListComponent from "./components/days-list.js";
import StatisticComponent from "./components/statistic.js";
import MenuComponent from "./components/menu.js";
import TripController from "./controllers/trip.js";
import FilterController from "./controllers/filter.js";
import EventsModel from "./models/points.js";

const events = getEventObjects(20);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const tripControlsElement = document.querySelector(`.trip-controls`);

const filterController = new FilterController(tripControlsElement, eventsModel);
filterController.render();

const daysListComponent = new DaysListComponent();
const tripController = new TripController(daysListComponent, eventsModel);
tripController.render();

filterController.joinSort(tripController.getSortComponent());

const statisticComponent = new StatisticComponent(eventsModel);
statisticComponent.render();

const menuComponent = new MenuComponent();
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
menuComponent.setShowStatsHandler(() => {
  tripController.hide();
  statisticComponent.show();

  const sortComponent = tripController.getSortComponent();
  sortComponent.rerender();
});

menuComponent.setShowTableHandler(() => {
  statisticComponent.hide();
  tripController.show();

  const sortComponent = tripController.getSortComponent();
  sortComponent.rerender();
});
render(menuHeaderElement.nextSibling, menuComponent);
