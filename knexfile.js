// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {    
    client: 'postgres',
    connection: {
      database : process.env.PGDATABASE || 'railway',
      host : process.env.PGHOST || 'containers-us-west-201.railway.app',
      password : process.env.PGPASSWORD || '6f9t14PZKJVrny34K1ma',
      user : process.env.PGUSER || 'postgres',
      port: process.env.PGPORT || 7146
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
