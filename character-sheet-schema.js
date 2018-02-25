var mongoose = require('mongoose');

var characterSheetSchema = mongoose.Schema({
	name: String,
	species: String,
	level: Number,
	influence: Number,
	presence: Number,
	sympathy: Number,
	resolve: Number,
	elegance: Number
});

const CharacterSheet = mongoose.model( 'CharacterSheet', characterSheetSchema);

module.exports = {CharacterSheet};