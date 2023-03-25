 
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Joi = require('joi');
// const cors=require('cors');
const CrudServices=require('./services/crud_service')
const services=new CrudServices()


const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: "0.0.0.0",
  "routes":{
    "cors":true
  }
});

const init = async () => {
  const swaggerOptions = {
    info: {
      title: 'Hapy Swagger',
      version: Pack.version,

    },
  };
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};


//     // create
server.route({
  method: 'post',
  path: '/user',
  options: {
    tags: ['api'],
    description: 'Create a new user',
    notes: 'Returns the created user object',
    validate: {
      payload: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      })
    },
  },
  handler: async (req, h) => {
    try {
      const result = await services.create(req.payload)
      if (!result) {
        return h.response("already exists").code(400)
      }
      return h.response(result).code(201)
    } catch (error) {
      return h.response("I'm post").code(500)
    }
  }
     
})
server.route({
  method: 'get',
  path: '/user/{email}',
  options: {
    tags: ['api'],
    description: 'Get all users',
    notes: 'Returns an array of user objects',
    validate: {
          query: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
          }),
        },
    },
  handler: async (req, h) => {
    try {
      const email = req.query.email
      const result = await services.read(email)
      if (!result.error) {
        return h.response(result).code(200)
      }
      return h.response("data not found").code(400)

    } catch (error) {
      return h.response("internal error").code(500)
    }
  }
})

// todo



server.route({
  method: 'GET',
  path: '/todo_list',
  options: {
    tags: ['api'],
    description: 'Get all users',
    notes: 'Returns an array of user objects',
  },
  handler: async(req, h) => {
    console.log(req.params.id,"bbbbbbbbbbbbbbbbb")
    const result = await services.todoread(req.params.id)
    return h.response(result).code(201)
  }
});

//     // create
server.route({
  method: 'post',
  path: '/todo_list',
  options: {
    tags: ['api'],
    description: 'Create a new user',
    notes: 'Returns the created user object',
    validate: {
      payload: Joi.object({
        titel: Joi.string().required(),
        date: Joi.number().integer().required(),
      })
    },
  },
  handler: async (req, h) => {
    try {
      console.log(req.payload);
      const result = await services.todocreate(req.payload)
      console.log(result,"12345678")
      if (!result) {
        return h.response("already exists").code(400)
      }
      return h.response(result).code(201)
    } catch (error) {
      return h.response("I'm post").code(500)
    }
  }
})


//     // read
server.route({
  method: 'get',
  path: '/todo_list/{id}',
  options: {
    tags: ['api'],
    description: 'Get all users',
    notes: 'Returns an array of user objects',
    validate: {
          params: Joi.object({
            id: Joi.number().integer().required(),
          }),
        },
    },
  handler: async (req, h) => {
    try {
      console.log(req.params)
      const id = parseInt(req.params.id)
      const result = await services.todoread(id)
      console.log(result)
      if (!result.error) {
        return h.response(result).code(200)
      }
      return h.response("data not found").code(400)

    } catch (error) {
      return h.response("internal error").code(500)
    }
  }
})

// //     // update
server.route({
  method: 'put',
  path: '/todo_list/{id}',
  options: {
    tags: ['api'],
    description: 'Get all users',
    notes: 'Returns an array of user objects',
    validate: {
      params: Joi.object({
        id: Joi.number().integer().required(),
      }),
      payload: Joi.object({
        titel: Joi.string().required(),
        date: Joi.number().integer().required(),
      }),      
    },
  },
  handler: async (req, h) => {
    try {
       
      const iid = parseInt(req.params.id)
      console.log(iid,"nnnnnnn")
      const result = await services.todoupdate(iid,req.payload)

      console.log(result,"111111111111111111")
      if (!result.error) {
        return h.response(result).code(200)
      }
      return h.response("data not found").code(400)

    } catch (error) {
      console.log(error,"mmmmmmmmmmmmm")
      return h.response("internal error").code(500)
    }
  }
})

//     // delete
server.route({
  method: 'delete',
  path: '/todo_list/{id}',
  options: {
    tags: ['api'],
    description: 'Get all users',
    notes: 'Returns an array of user objects',
    validate: {
              params: Joi.object({
                id: Joi.number().integer().required(),
              }),
            },
  },
  handler: async (req, h) => {
    try {
      const id = parseInt(req.params.id)
      const result = await services.tododelete(id)
      if (!result.error) {
        return h.response(result).code(200)
      }
      return h.response("data not found").code(400)

    } catch (error) {
      return h.response("internal error").code(500)
    }
  }
})


init();