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

// router.put('/character-sheet/:id', jsonParser, (req, res) => {
//   CharacterSheet
//   .findByIdAndUpdate(req.params.id)

// 	const requiredFields = [ 'id', 'name', 'level'];
// 	for (let i=0; i<requiredFields.length; i++) {
// 		const field = requiredFields[i];
// 		if (!(field in req.body)) {
// 			const message = `Missing \`${field}\` in request body`
//   		console.error(message);
//   		res.status(400).send(message);
// 		}
// 	}
// 	if (req.params.id !== req.body.id) {
//      const message = (
//      	`Your dang id: (${req.params.id}) doesn't match this id: `
//      	`(${req.body.id}) ya doofus!`);
//      console.error(message);
//     	res.status(400).send(message);
//    }
//   console.log(`Updating blog post with id \`${req.params.id}\``);
//   const updatedItem = CharacterSheet.update({
//   	id: req.params.id,
//   	name: req.body.name,
//   	level: req.body.level
//   });
//   res.status(200).json(updatedItem);
// });


// router.delete('/character-sheet/:id', (req, res) => {
// 	CharacterSheet.delete(req.params.id);
// 	res.status(204).send();
// });

module.exports = router;