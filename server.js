 
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Joi = require('joi');
const CrudServices=require('./services/crud_service')
const services=new CrudServices()


const server = Hapi.server({
  port: 5000,
  host: 'localhost',
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
      console.log(req);
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
      console.log(req.query,"qwert")
      const email = req.query.email
      const result = await services.read(email)
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


init();