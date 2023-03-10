exports.up = async (knex)=>{
    await knex.schema.createTable('userss' , (table)=>{
      table.increments('id');
      table.string('name');
      table.string('email');
      table.string('password');
    })
  }
  exports.down = async (knex)=>{
    await knex.schema.createTable('userss');
  }