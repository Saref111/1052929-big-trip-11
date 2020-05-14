import {getEventObjects} from "./mock/event.js";
import DaysListComponent from "./components/days-list.js";
import TripController from "./controllers/trip.js";
import EventsModel from "./models/points.js";

const events = getEventObjects(20);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const daysListComponent = new DaysListComponent();
const tripController = new TripController(daysListComponent, eventsModel);
tripController.render();

