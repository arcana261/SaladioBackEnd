'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const winston = require('winston');
const expressWinston = require('express-winston');
module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
  api: true,
  swaggerSecurityHandlers: require('./api/helpers/securityHandlers')
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: false,
        colorize: true
      })
    ],
    meta: false,
    expressFormat: true,
    colorize: true
  }));

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;

  app.listen(port);

  console.log('!! API server is up!');
  console.log('!! to view swagger schema definition, simply open');
  console.log('!! \'http://127.0.0.1:' + port + '/v1/swagger\' in your browser');
  console.log('!! enjoy!');
  console.log();
  console.log();
});
