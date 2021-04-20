'use strict';

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const reservationSchema = require('./schema/reservation.js');
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: reservationSchema,
  graphiql: true,
}));

if (process.env.devEnv) {
  const port = process.env.port || 3000;

  require('dotenv').config({
    path: `${__dirname}/config/.env`
  });

  app.listen(port, function () {
    console.log('Running on port: ' + port);
  });
}
