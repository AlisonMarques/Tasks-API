import knex from 'knex';
import config from '../../knexfile';

const connection = knex(config.development);

module.exports = connection;
