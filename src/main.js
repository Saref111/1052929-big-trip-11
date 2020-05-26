import API from "./api.js";
import {render} from "./utils/render.js";
import DaysListComponent from "./components/days-list.js";
import StatisticComponent from "./components/statistic.js";
import MenuComponent from "./components/menu.js";
import TripController from "./controllers/trip.js";
import FilterController from "./controllers/filter.js";
import EventsModel from "./models/points.js";

const AUTHORIZATION_TOKEN = `Basic asasfs88666wge82h33`;

const api = new API(AUTHORIZATION_TOKEN);

const tripControlsElement = document.querySelector(`.trip-controls`);
const container = document.querySelector(`.trip-events`);
container.innerHTML = `<p class="trip-events__msg">Loading...</p>`;
const eventsModel = new EventsModel();

const filterController = new FilterController(tripControlsElement, eventsModel);
filterController.render();

const daysListComponent = new DaysListComponent();
const tripController = new TripController(daysListComponent, eventsModel);


filterController.joinSort(tripController.getSortComponent());

const statisticComponent = new StatisticComponent(eventsModel);
statisticComponent.render();

const menuComponent = new MenuComponent();
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
menuComponent.setShowStatsHandler(() => {
  tripController.hide();
  statisticComponent.update();
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

api.getEvents()
.then((events) => {
  console.log(events);
  eventsModel.setEvents(events);
  container.innerHTML = ``;
  tripController.render();
}).catch(() => {
  container.innerHTML = ``;
  tripController.render();
});

