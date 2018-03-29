const express = require('express');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { localStrategy, jwtStrategy } = require('./strategies');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const passport= require('passport');
const { secret, JWT_EXPIRY} = require('./config');

passport.use(localStrategy);
passport.use(jwtStrategy);

mongoose.Promise = global.Promise;

const {User} = require('./user-schema');
const {CharacterSheet} = require('./character-sheet-schema');

///////////////////////////////////////////////////////////////

const createAuthToken = function(user) {
  return jwt.sign({user}, secret, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const jwtAuth = passport.authenticate('jwt', {session: false});
const localAuth = passport.authenticate('local', {session: false});

router.use(bodyParser.json());

router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  res.json({authToken});
});

router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

router.post('/register', (req, res) => {
  console.log(req.body);
  User
    //.find(check to see user exists?)
    .create({
      username: req.body.username,
      password: req.body.password
    })
    .then(user => {
      console.log("Yo dog you made:", user);
      res.status(201).json(User);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    })
});
 

///////////////////////////////////////////////////////////////

router.get('/character-sheet/:user', jwtAuth, (req, res) => {
  console.log("Getting all character-sheets");
	CharacterSheet
    .find({user: req.params.user})
    .then(characterSheets => {
      console.log("What?", characterSheets);
      res.status(200).json(characterSheets);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    })
});

router.get('/character-sheet/detail/:id', (req, res) => {
  CharacterSheet
    .findById(req.params.id)
    .then(characterSheet => res.status(200).json(characterSheet))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    })	
});

router.post('/character-sheet', jsonParser, (req, res) => {
  console.log("I have this thing:", req.body);
  CharacterSheet
  .create({
    user: req.body.user,
    name: req.body.name,
    species: req.body.species,
    level: req.body.level,
    influence: req.body.influence,
    presence: req.body.presence,
    sympathy: req.body.sympathy,
    resolve: req.body.resolve,
    elegance: req.body.elegance
  })
  .then(characterSheet => {
    console.log("hey man it sent:", req.body)
    console.log("Yo dog you made:", characterSheet);
    res.status(201).json(characterSheet);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
  })  
});

router.put('/character-sheet/:id', jsonParser, (req, res) => {
   CharacterSheet
     .findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
     .then(characterSheet => res.status(200).json(characterSheet))
     .catch(err => {
        console.error(err);
        res.status(500).jason({message: 'Internal server error'});
      })
});

router.delete('/character-sheet/:id', jsonParser, (req, res) => {
  CharacterSheet
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    })  
})

module.exports = router;