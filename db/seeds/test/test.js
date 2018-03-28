const tmData = require('../../../data.json');
const cleanData = require('../../../helper');

const createVenue = (knex, venue) => {
  return knex('venues').insert({
    name: venue.name,
    city: venue.city
  }, 'id')
  .then(venueId => {
    let concertPromises = [];

    venue.concerts.forEach(concert => {
      concertPromises.push(
        createConcert(knex, {
          artist: concert.artist,
          date: concert.date,
          time: concert.time,
          venue_id: venueId[0]
        })
      )
    });

    return Promise.all(concertPromises);
  })
};

const createConcert = (knex, concert) => {
  return knex('concerts').insert(concert);
};

exports.seed = function(knex, Promise) {
  return knex('concerts').del()
    .then(() => {
      return knex('venues').del();
    })
    .then(() => {
      let venuePromises = [];
      const venue = { 
        name: 'Red Rocks',
        city: 'Denva Baby',
        concerts: [{
          artist: 'Kelly Clarkson',
          date: 'Yesterday',
          time: '3:00',
          venue_id: 1
        }]
      }
      venuePromises.push(createVenue(knex, venue));
      

      return Promise.all(venuePromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
