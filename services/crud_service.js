const Crud = require("../model/crud_mode");

class CrudServices {

    // Create
    async create(data) {
        try {
            const isData = await Crud.query().where({ 'email': data.email })
            console.log(isData)
            if (isData.length == 0) {
                await Crud.query().insert(data);
                return 'data inserted'
            }
            return
        } catch (error) {
            console.log(error);
            return { error: error.message }
        }
    } 
    async read(email){
        try {
            // console.log(id,'ertyui')
            const Data = await Crud.query().select('id','name','email').where( 'email',email)
            console.log(Data,"wertyui")
            return Data 
        } catch (error) {
            return { error: error.message }
        }
    }       
   
}

module.exports = CrudServices