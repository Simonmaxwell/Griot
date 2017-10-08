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
    if (id !== null) {
      return this.characters.find(character => character.id === id);
    }else return this.characters;
  },

  update: function(updatedCharacter) {
    const {id} = updatedCharacter;
    const characterIndex = this.characters.findIndex(
      character => character.id === updatedCharacter.id);
    if (characterIndex === -1) {
      throw new StorageException(
        `Can't update item \`${id}\` because doesn't exist.`)
    }
    this.characters[characterIndex] = Object.assign(
      this.characters[characterIndex], updatedCharacter);
    return this.characters[characterIndex];
  },

  delete: function(id) {
    const characterIndex = this.characters.findIndex(
      character => character.id === id);
    if (characterIndex > -1) {
      this.characters.splice(characterIndex, 1);
    }
  }
};

function createCharacterSheetModel() {
  console.log("Creating character sheets...");
  const storage = Object.create(CharacterSheet);
  storage.characters = [];
  return storage;
}

module.exports = {CharacterSheet: createCharacterSheetModel()};