const Joi = require('@hapi/joi')
const { Model } = require('objection')
const database = require('../config/db_connection')
const knexfile = require('../knexfile')


Model.knex(database)

class todoModel extends Model {
    static get tableName() {
        return 'todo_table'
    }
    static get joiSchema() {
        Joi.object({
            titel: Joi.string().required(),
            date: Joi.number().integer().required()
        })
        let data = schemaValidate.validate(req.payload)
        if (data.error) {
            return ("please fill all the fields properly")

        }

    } catch(error) {
        return (error.message)
    }
}

module.exports = todoModel


//  

















 