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

router.get('/character-sheet/:id', (req, res) => {
	res.json(CharacterSheet.get(req.params.id));
});

router.post('/character-sheet', jsonParser, (req, res) => {
	const requiredFields = ['name', 'level'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
  		const message = `Missing \`${field}\` in request body`
  		console.error(message);
  		res.status(400).send(message);
		}
	}
	const item = CharacterSheet.create(req.body.name, req.body.level);
    res.status(201).json(item);
});

router.put('/character-sheet/:id', jsonParser, (req, res) => {
	const requiredFields = [ 'id', 'name', 'level'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
  		console.error(message);
  		res.status(400).send(message);
		}
	}
	if (req.params.id !== req.body.id) {
     const message = (
     	`Your dang id: (${req.params.id}) doesn't match this id: `
     	`(${req.body.id}) ya doofus!`);
     console.error(message);
    	res.status(400).send(message);
   }
  console.log(`Updating blog post with id \`${req.params.id}\``);
  const updatedItem = CharacterSheet.update({
  	id: req.params.id,
  	name: req.body.name,
  	level: req.body.level
  });
  res.status(200).json(updatedItem);
});


router.delete('/character-sheet/:id', (req, res) => {
	CharacterSheet.delete(req.params.id);
	res.status(204).send();
});

module.exports = router;