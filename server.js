const express = require('express');
const path = require('path');

const morgan = require('morgan');

const app = express();
const router = require('./router');

app.use(morgan('common'));
app.use(router);

let server;

function runServer() {
  const port = process.env.PORT || 8090;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer}