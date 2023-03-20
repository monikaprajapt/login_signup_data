// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {    
    client: 'postgres',
    connection: {
      database : process.env.PGDATABASE || 'railway',
      host : process.env.PGHOST || 'containers-us-west-183.railway.app',
      password : process.env.PGPASSWORD || 'b8nHORDjlOs73eN3dvrT',
      user : process.env.PGUSER || 'postgres',
      port: process.env.PGPORT || 6894
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
