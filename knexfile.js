module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/concerts_venues',
    migrations: {
      directory: './db/migrations'
    },
    seeds:  {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
};
