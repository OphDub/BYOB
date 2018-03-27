module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/marijuana_crimes',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
};
