const TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
const CITIES = [`Amsterdam`, `Chamonix`, `Geneva`, `Saint Petersburg`, `Kiev`, `Prague`, `New York`, `Beijing`, `Hongkong`, `Dubai`];

const PICTURE = `http://picsum.photos/248/152?r=`;

const getTripInfo = () => {
  return [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
    `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. `,
    `Aliquam id orci ut lectus varius viverra. `,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. `,
    `Aliquam erat volutpat. `,
    `Nunc fermentum tortor ac porta dapibus. `,
    `In rutrum ac purus sit amet tempus. `,
  ].map((it) => Math.random() > 0.5 ? it : undefined).join(``);
};

const getOffers = () => {
  const OFFERS = [
    {
      name: `luggage`,
      text: `Add luggage`,
      price: 30,
      active: Math.random() > 0.5,
    },
    {
      name: `comfort`,
      text: `Switch to comfort class`,
      price: 100,
      active: Math.random() > 0.5,
    },
    {
      name: `meal`,
      text: `Add meal`,
      price: 15,
      active: Math.random() > 0.5,
    },
    {
      name: `seats`,
      text: `Choose sits`,
      price: 5,
      active: Math.random() > 0.5,
    },
    {
      name: `train`,
      text: `Travel by train`,
      price: 40,
      active: Math.random() > 0.5,
    },
    {
      name: `uber`,
      text: `Order Uber`,
      price: 20,
      active: Math.random() > 0.5,
    },
  ];

  return OFFERS;
};

const FilterType = {
  EVERYTHING: `everything`,
  PAST: `past`,
  FUTURE: `future`,
};

const EditFormMode = {
  EDIT: `edit`,
  FIRST: `first`,
  CREATE: `create`,
};

const DefaultEvent = {
  id: 111,
  type: TYPES[0],
  place: CITIES[0],
  offers: getOffers(),
  startTime: new Date(),
  endTime: new Date(),
  isFavorite: false,
  price: 150,
};

export {TYPES, CITIES, getOffers, getTripInfo, PICTURE, FilterType, EditFormMode, DefaultEvent};
