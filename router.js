const express = require('express');
const router = require('express').Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {CharacterSheet} = require('./character-sheet-model');

CharacterSheet.create(
  "Doug Jones", 5);
CharacterSheet.create(
  "Craig Robertson", 8);

router.get('/character-sheet', (req, res) => {
	res.json(CharacterSheet.get());
});

router.put('/character-sheet/:id', function(req, res) {
});

router.post('/character-sheet', function(req, res) {

});

router.delete('/character-sheet/:id', function(req, res) {
});

module.exports = router;