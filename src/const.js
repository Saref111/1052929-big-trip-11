const TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
const CITIES = [`Amsterdam`, `Chamonix`, `Geneva`];


const PICTURE = `http://picsum.photos/248/152?r=${Math.random()}`;

const getInfo = () => {
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

export {TYPES, CITIES, getOffers, getInfo, PICTURE};
