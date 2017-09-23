const uuid = require('uuid');

const CharacterSheet = {

  create: function(name, level) {
    const character = {
      id: uuid.v4(),
      name: name,
      level: level
    };
    this.characters.push(character);
    console.log(character);
    return character;
  },

  get: function(id=null) {
      console.log("I made it!");
    if (id !== null) {
      return this.characters.find(character => character.id === id);
    }else return this.characters;

  }
};

function createCharacterSheetModel() {
  console.log("Creating character sheets...");
  const storage = Object.create(CharacterSheet);
  storage.characters = [];
  return storage;
}

module.exports = {CharacterSheet: createCharacterSheetModel()};