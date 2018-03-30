const cleanData = (data) => {
  const { events } = data._embedded;

  const concertsArr = events.map(event => {
    return {
      artist: event.name,
      date: event.dates.start.localDate,
      time: event.dates.start.localTime
    };
  });

  const venuesArr = events.map(event => {
    return {
      name: event._embedded.venues[0].name,
      city: event._embedded.venues[0].city.name,
      concerts: concertsArr
    };
  });

  return Array.from(new Set(venuesArr));
};

module.exports = cleanData;