const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Joi = require('joi');


const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: "0.0.0.0",
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

  
server.route({
  method: 'GET',
  path: '/user',
  options: {
    tags: ['api'],
    description: 'Get all users',
    notes: 'Returns an array of user objects',
  },
  handler: (req, h) => {
    return "<h1>I'm Working</h1>"
  }
});

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
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      })
    },
  },
  handler: async (req, h) => {
    try {
      // console.log(req.payload);
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

//     // read
server.route({
  method: 'get',
  path: '/user/{id}',
  options: {
    tags: ['api'],
    description: 'Get all users',
    notes: 'Returns an array of user objects',
  },
  handler: async (req, h) => {
    try {
      const id = parseInt(req.params.id)
      const result = await services.read(id)
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
  path: '/user/{id}',
  options: {
    tags: ['api'],
    description: 'Get all users',
    notes: 'Returns an array of user objects',
  },
  handler: async (req, h) => {
    try {
      const id = parseInt(req.params.id)
      const result = await services.update(id, req.payload)
      if (!result.error) {
        return h.response(result).code(200)
      }
      return h.response("data not found").code(400)

    } catch (error) {
      return h.response("internal error").code(500)
    }
  }
})

//     // delete
server.route({
  method: 'delete',
  path: '/user/{id}',
  options: {
    tags: ['api'],
    description: 'Get all users',
    notes: 'Returns an array of user objects',
  },
  handler: async (req, h) => {
    try {
      const id = parseInt(req.params.id)
      const result = await services.delete(id)
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
