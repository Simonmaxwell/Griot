var mongoose = require('mongoose');

var characterSheetSchema = mongoose.Schema({
	name: String,
	level: Number,
});

const CharacterSheet = mongoose.model( 'CharacterSheet', characterSheetSchema);

module.exports = {CharacterSheet};