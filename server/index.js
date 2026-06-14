// require('dotenv/config');
// const fastify = require('fastify')({
//   logger: true,
//   bodyLimit: 10485760,
// });
// const path = require('path');
// const routesRegister = require('./routes/routes-register.json');
// global.rootDir = __dirname;
// const connectDB = require('./connector/mongoConnector');
// const { config } = require('dotenv');
// connectDB();
// fastify.register(require('@fastify/multipart'));
// fastify.register(require('@fastify/cors'), {});
// routesRegister.forEach(route => fastify.register(require(path.resolve(__dirname, route))));
// fastify.setNotFoundHandler((request, reply) => {
//   reply.code(403).type('application/json').send({
//     statusCode: 403,
//     status: 403,
//     message: 'Forbidden',
//   });
// });

// const PORT = process.env.PORT || 5600;
// const HOST = process.env.HOST || '127.0.0.1';
// fastify.listen({ port: PORT, host: HOST }, (err, address) => {
//   if (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }

//   fastify.log.info(`Environment 1s; ${process.env.NODE_ENV}`);
//   fastify.log.info(`server listening on ${address}`);
// });

require('dotenv/config');

const fastify = require('fastify')({
  logger: true,
  bodyLimit: 10 * 1024 * 1024, // 10 MB
});

const path = require('path');
const routesRegister = require('./routes/routes-register.json');
const connectDB = require('./connector/mongoConnector');

// Global variable for root directory
global.rootDir = __dirname;

const seedAdmin = require('./utils/adminSeed');

// Connect to DB and seed admin
const startServer = async () => {
  await connectDB();
  await seedAdmin();

  // Register plugins
  fastify.register(require('@fastify/multipart'));
  fastify.register(require('@fastify/cors'), {});

  // Register all routes
  routesRegister.forEach(route => fastify.register(require(path.resolve(__dirname, route))));

  // 404 Handler
  fastify.setNotFoundHandler((request, reply) => {
    reply.code(403).type('application/json').send({
      statusCode: 403,
      status: 403,
      message: 'Forbidden',
    });
  });

  // Start listening
  const PORT = process.env.PORT || 5600;
  const HOST = process.env.RENDER ? '0.0.0.0' : process.env.HOST || '127.0.0.1';

  fastify.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }

    fastify.log.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    fastify.log.info(`Server listening on ${address}`);
  });
};

startServer();

