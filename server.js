const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');
const app = express();
const {PORT, DATABASE_URL} = require('./config');
const passport = require('passport');

mongoose.Promise = global.Promise;

app.use(express.static('JQfront'));
app.use(cors());
app.use(morgan('common'));

var session = require("express-session");

app.use(session({secret: "Z4blealo$!"}));
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
              return reject(err);
           }
           resolve();
       });
     });
  });
};

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer}