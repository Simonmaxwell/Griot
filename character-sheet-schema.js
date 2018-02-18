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

// characterSheetSchema.virtual('initiative').get(function(){
// 	let initiative = (this.sympathy + this.elegance) / 4;
// 	return initiative;
// });

const CharacterSheet = mongoose.model( 'CharacterSheet', characterSheetSchema);

module.exports = {CharacterSheet};