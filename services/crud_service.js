const Crud = require("../model/crud_mode");

class CrudServices {

    // Create
    async create(data) {
        try {
            const isData = await Crud.query().where({ 'email': data.email })
            if (isData.length == 0) {
                await Crud.query().insert(data);
                return 'data inserted'
            }
            return
        } catch (error) {
            return { error: error.message }
        }
    } 
    async read(email){
        try {
            const Data = await Crud.query().select('id','name','email').where( 'email',email)
            return Data 
        } catch (error) {
            return { error: error.message }
        }
    }       
   
}

module.exports = CrudServices