exports.up = async (knex)=>{
    await knex.schema.createTable('todo_table' , (table)=>{
      table.increments();
      table.string('titel');
      table.integer('date');
    })
  }
  exports.down = async (knex)=>{
    await knex.schema.dropTable('todo_table');
  }