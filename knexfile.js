// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {    
    client: 'postgres',
    connection: {
      database : process.env.PGDATABASE || 'my_db',
      host : process.env.PGHOST || 'localhost',
      password : process.env.PGPASSWORD || 'Monika@123',
      user : process.env.PGUSER || 'postgres',
      port: process.env.PGPORT || 5432
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
