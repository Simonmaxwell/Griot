const express = require('express');
const path = require('path');

const cors = require('cors');

const morgan = require('morgan');

const app = express();
const mongoose = require('mongoose');
const router = require('./router');

mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');

app.use(cors());
app.use(morgan('common'));
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