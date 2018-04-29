const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const {app, runServer, closeServer} = require('../server');
const {CharacterSheet} = require('../character-sheet-schema');

chai.use(chaiHttp);

const global_username = "test";
const global_password = "test";

describe('test-server', function() {
  function login_and_resolve_token(app, donef) { // returns a promise
    return new Promise(function(resolve, reject) {
      chai.request(app)
        .post('/login')
        .send({username: global_username, password: global_password})
        .then(function(response) {
          token = response.body.authToken;
          resolve(token);
        }).catch( (err) => { donef(err); });
    });
  };

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function(done) {
    mongoose.connection.dropDatabase();
    const newSheet = {
      user: global_username,
      name: 'Firstname Lastname',
      level: 10
    };
    chai.request(app)
      .post('/register')
      .send({username: global_username, password: global_password})
      .then( () => {
      chai.request(app)
        .post('/character-sheet')
        .send(newSheet)
        .then(function(res) { done(); });
     });
  });

  afterEach(function() {

  });

 it('should list character sheets on GET', function(done) {
    login_and_resolve_token(app, done)
      .then(function(token) {
        chai.request(app)
          .get(`/character-sheet/${global_username}`)
          .set('Authorization', 'Bearer ' + token)
          .then(function(res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.length.should.be.above(0);
            res.body.forEach(function(item) {
              item.should.be.a('object');
              item.should.have.all.keys('_id', 'name', 'level', '__v', 'user');
              item.user.should.equal('test');
            });
            done();
          }).catch( (err) => { done(err); });
      });
  }); 

  it('should add a character sheet on POST', function() {
    let newSheet = {
      user: global_username,
      name: 'Bubba Bubba',
      level: 20
    };
    const expectedKeys = ['_id', '__v'].concat(Object.keys(newSheet));

    return chai.request(app)
      .post('/character-sheet')
      .send(newSheet)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.all.keys(expectedKeys);
        res.body.name.should.equal(newSheet.name);
        res.body.level.should.equal(newSheet.level);
        res.body.user.should.equal('test');
      });
  });

  it('should throw an error if POST is missing expected values', function() {
    const junkData = {};
    return chai.request(app)
      .post('/character-sheet')
      .send(junkData)
      .catch(function(res) {
        res.should.have.status(400);
      });
  });

  it('should update character sheets on PUT', function(done) {
    let updatedCharacter = {};
    login_and_resolve_token(app, done)
      .then(function(token) {
        chai.request(app)
          .get(`/character-sheet/${global_username}`)
          .set('Authorization', 'Bearer ' + token)
          .then(function(res) {
            updatedCharacter = {
              name: ishmael
            };
            chai.request(app)
              .put(`/character-sheet/${res.body[0]._id}`)
              .send(updatedCharacter)
              .catch(function(res) {
                res.should.have.status(200);
              });
          });
          done();
        }).catch( (err) => { done(err); });
    }); 

  it('should delete character sheets on DELETE', function(done) {
  	 login_and_resolve_token(app, done)
      .then(function(token) {
        chai.request(app)
          .get(`/character-sheet/${global_username}`)
          .set('Authorization', 'Bearer ' + token)
          .then(function(res) {
            chai.request(app)
  		      .delete(`/character-sheet/${res.body[0]._id}`)
  		      .then(function(res) {
              res.should.have.status(204)
  		      });
            done();
          }).catch( (err) => { done(err); });
  	   });
  });
});
