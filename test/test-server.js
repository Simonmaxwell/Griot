const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

const mongoose = require('mongoose');
mongoose.Promis = global.Promise

const {app, runServer, closeServer} = require('../server');
const {CharacterSheet} = require('../character-sheet-schema');

chai.use(chaiHttp);

describe('test-server', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function() {
    mongoose.connection.dropDatabase();
    const newSheet = {
      name: 'Firstname Lastname',
      level: 10
    };
    return chai.request(app)
      .post('/character-sheet')
      .send(newSheet)
    
  });

  afterEach(function() {

  });

  it('should list character sheets on GET', function() {
    return chai.request(app)
      .get('/character-sheet')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.above(0);
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.have.all.keys('_id', 'name', 'level', '__v')
        });
      });
  });

  it('should add a character sheet on POST', function() {
    const newSheet = {
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

  it('should update character sheets on PUT', function() {
    return chai.request(app)
      .get('/character-sheet')
      .then(function( res) {
        const updatedSheet = Object.assign(res.body[0], {
          name: 'Call me Ishmael',
          level: 35
        });
        return chai.request(app)
          .put(`/character-sheet/${res.body[0]._id}`)
          .send(updatedSheet)
          .then(function(res) {
            res.should.have.status(200);
            res.body.name.should.equal('Call me Ishmael');
          });
      });
  }); 

  it('should delete character sheets on DELETE', function() {
  	return chai.request(app)
  	.get('/character-sheet')
  	.then(function(res) {
  	   return chai.request(app)
  		.delete(`/character-sheet/${res.body[0]._id}`)
  		.then(function(res) {
  			res.should.have.status(204)
  		});
  	});
  });
});