const express = require('express');
const router = require('express').Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {CharacterSheet} = require('./character-sheet-schema');

router.get('/character-sheet', (req, res) => {
	CharacterSheet
    .find()
    .exec()
    .then(characterSheets => res.status(200).json(characterSheets))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    })
});

router.get('/character-sheet/:id', (req, res) => {
  CharacterSheet
    .findById(req.params.id)
    .exec()
    .then(characterSheet => res.status(200).json(characterSheet))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    })	
});

router.post('/character-sheet', jsonParser, (req, res) => {
  CharacterSheet
  .create({
    name: req.body.name,
    level: req.body.level
  })
  .then(characterSheet => res.status(201).json(characterSheet))
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
  })  
});

router.put('/character-sheet/:id', jsonParser, (req, res) => {
   CharacterSheet
     .findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
     .exec()
     .then(characterSheet => res.status(200).json(characterSheet))
     .catch(err => {
        console.error(err);
        res.status(500).jason({message: 'Internal server error'});
      })
});

router.delete('/character-sheet/:id', jsonParser, (req, res) => {
  CharacterSheet
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.status(204).end())
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    })  
})

module.exports = router;