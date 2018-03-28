exports.seed = function(knex, Promise) {
  return knex('concerts').del()
    .then(() => {
      return knex('venues').del();
    })
    .then(() => {
      return Promise.all([
        knex('venues').insert({
          name: "Red Rocks",
          city: "Denver"
        }, 'id')
        .then(venue => {
          return knex('concerts').insert([
            {
              artist: "Kelly Clarkson",
              date: "3/27/2018",
              time: "8:00pm",
              venue_id: venue[0]
            },
            {
              artist: "Lil Jon",
              date: "3/29/2018",
              time: "8:00pm",
              venue_id: venue[0]
            }
          ], 'id')
        })
        .then()
        .catch(err => console.log(`Error seeding data: ${err}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
