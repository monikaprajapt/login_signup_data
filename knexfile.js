// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {    
    client: 'postgres',
    connection: {
      database: 'my_db',
      user:     'postgres',
      password: 'Monika@123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
}
