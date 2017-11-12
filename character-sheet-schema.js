var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var characterSheetSchema = new Schema({
	name: String,
	level: Number,
});

const CharacterSheet = mongoose.model( 'CharacterSheet', characterSheetSchema);

module.exports = {CharacterSheet};