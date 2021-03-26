// Update with your config settings.

module.exports = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 123456,
    // filename: './src/database/db.postgresql',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
  },
};
