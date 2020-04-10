const TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check`, `sightseeing`, `restuarant`];
const CITIES = [`Amsterdam`, `Chamonix`, `Geneva`];
const OFFERS = [
  {
    name: `luggage`,
    price: 30,
    active: Math.random() > 0.5,
  },
  {
    name: `comfort`,
    price: 100,
    active: Math.random() > 0.5,
  },
  {
    name: `meal`,
    price: 15,
    active: Math.random() > 0.5,
  },
  {
    name: `seats`,
    price: 5,
    active: Math.random() > 0.5,
  },
  {
    name: `train`,
    price: 40,
    active: Math.random() > 0.5,
  },
];
const getInfo = () => {
  const DESTINATION_INFO = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
    `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. `,
    `Aliquam id orci ut lectus varius viverra. `,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. `,
    `Aliquam erat volutpat. `,
    `Nunc fermentum tortor ac porta dapibus. `,
    `In rutrum ac purus sit amet tempus. `,
  ];

  return DESTINATION_INFO.map((it) => Math.random() > 0.5 ? it : undefined).join(``);
};

const PICTURE = `http://picsum.photos/248/152?r=${Math.random()}`;

export {TYPES, CITIES, OFFERS, getInfo, PICTURE};
