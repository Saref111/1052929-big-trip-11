const countMoney = (events, types) => {
  return types.map((type) => {
    return events.reduce((acc, it) => it.type === type ? acc + it.price : acc, 0);
  });
};

const countTransport = (events, types) => {
  const reply = types.map((it) => {
    let count = 0;
    events.forEach((ev) => {
      if (it === ev.type) {
        count++;
      }
    });
    return count;
  });
  return reply;
};

const getTypes = (events) => {
  return events.slice().reduce((acc, it) => {
    if (!acc.includes(it.type)) {
      acc.push(it.type);
    }
    return acc;
  }, []);
};

const getEmoji = (type) => {
  let emoji = ``;

  switch (type) {
    case `taxi`:
      emoji = `🚖`;
      break;
    case `bus`:
      emoji = `🚌`;
      break;
    case `train`:
      emoji = `🚋`;
      break;
    case `ship`:
      emoji = `🚢`;
      break;
    case `transport`:
      emoji = `🚜`;
      break;
    case `drive`:
      emoji = `🚘`;
      break;
    case `flight`:
      emoji = `✈️`;
      break;
    case `check-in`:
      emoji = `🏨`;
      break;
    case `sightseeing`:
      emoji = `🏛`;
      break;
    case `restaurant`:
      emoji = `🍴`;
      break;
    default:
      break;
  }

  return emoji;
};

const getLabels = (types) => {
  return types.slice().reduce((acc, it) => {
    acc.push(`${getEmoji(it)} ${it.toUpperCase()}`);
    return acc;
  }, []);
};

const isTransport = (type) => {
  return !(type === `check-in` || type === `sightseeing` || type === `restaurant`);
};

const getTransportTypes = (events) => {
  const types = events.slice().map((it) => it.type).filter((it) => isTransport(it));

  const uniqueTypes = types.reduce((acc, it) => {
    if (acc.includes(it)) {
      return acc;
    } else {
      return [...acc, it];
    }
  }, []);

  return uniqueTypes;
};

const getTimeTypes = (events) => {
  const types = events.reduce((acc, it) => {

    if (!isTransport(it.type)) {
      const [label] = getLabels([it.type]);
      return [...acc, label];
    } else {
      const [label] = getLabels([it.type]);

      return [...acc, `${label.slice(0, 2)} TO ${it.place.toUpperCase()}`];
    }
  }, []);
  return types;
};

const countTime = (events) => {
  return events.map((event) => event.endTime - event.startTime);
};

export {getTransportTypes, getLabels, getTypes, countTransport, countMoney, getTimeTypes, countTime};
