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

router.post('/character-sheet', jsonParser, (req, res) => {
	const requiredFields = ['name', 'level'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
  		const message = `Missing \`${field}\` in request body`
  		console.error(message);
  		return res.status(400).send(message);
		}
	}
	const item = CharacterSheet.create(req.body.name, req.body.level);
    res.status(201).json(item);
});


router.delete('/character-sheet/:id', function(req, res) {
});

module.exports = router;