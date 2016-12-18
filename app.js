'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing
const models = require('./models');
const sequelize = models.sequelize;

var config = {
  appRoot: __dirname, // required config
  api: true
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

    if (swaggerExpress.runner.swagger.paths['/hello']) {
      console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
    }
  }).catch(err => console.log(err));
});
