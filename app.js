'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing
const models = require('./models');
const sequelize = models.sequelize;

var config = {
  appRoot: __dirname, // required config
  api: true,
  swaggerSecurityHandlers: require('./api/helpers/securityHandlers')
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;

  sequelize.sync({force: false}).then(() => {
    app.listen(port);

    console.log('!! API server is up!');
    console.log('!! to view swagger schema definition, simply open');
    console.log('!! \'http://127.0.0.1:' + port + '/v1/swagger\' in your browser');
    console.log('!! enjoy!');
    console.log();
    console.log();

  }).catch(err => console.log(err));
});
