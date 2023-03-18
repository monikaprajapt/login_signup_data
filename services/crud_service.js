const Crud = require("../model/crud_mode");
const todoCrud = require("../model/todo_model");


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
    async read(email) {
        try {
            const Data = await Crud.query().select('id', 'name', 'email').where('email', email)
            return Data
        } catch (error) {
            return { error: error.message }
        }
    }
    // todo

    async todocreate(data) {
        try {
            await todoCrud.query().insert(data);
            return 'data inserted'
            // }
            // return
        } catch (error) {
            console.log(error);
            return { error: error.message }
        }
    }
    // Read
    async todoread(id = null) {
        let Data;
        try {
            if (!id) {
                Data = await todoCrud.query()
            }
            else {
                Data = await todoCrud.query().where('id', id)
            }
            console.log(id, 'ertyui')
            return Data
        } catch (error) {
            return { error: error.message }
        }
    }

    // Update
    async todoupdate(id ,data) {
        try {
            const r=await todoCrud.query().update({titel:data.titel,date:data.date}).where('id',id)
            return 'update success'
        } catch (error) {
            return { error: error.message }
        }
    }

    // Delete
    async tododelete(id) {
        try {
            const isData = await todoCrud.query().where({ id })
            if (isData.length == 0) {
                return 'nothing to delete'
            }
            await todoCrud.query().deleteById(id)
            return 'delete success'
        } catch (error) {
            return { error: error.message }
        }
    }


}

module.exports = CrudServices