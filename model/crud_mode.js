const Joi = require('@hapi/joi')
const { Model } = require('objection')
const database = require('../config/db_connection')
const knexfile = require('../knexfile')


Model.knex(database)

class CrudModel extends Model {
    static get tableName() {
        return 'userss'
    }
    static get joiSchema() {
        Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        })
        let data = schemaValidate.validate(req.payload)
        if (data.error) {
            return ("please fill all the fields properly")

        }

    } catch(error) {
        return (error.message)
    }
}

module.exports = CrudModel

















 