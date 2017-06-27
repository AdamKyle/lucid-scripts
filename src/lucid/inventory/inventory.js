// Initilize the main container.
window.lucidScripts = window.lucidScripts || {};
lucidScripts.lucidInventory = {};

lucidScripts.lucidInventory.parameters = PluginManager.parameters('LucidInventory');
lucidScripts.lucidInventory.inventory = {};

class LucidInventory {

  /**
   * separates out the party inventory.
   *
   * @param {int} partyIndex - the index of the party from the parties option.
   * @return {undefined} nothing.
   */
  separate(partyIndex) {
    this.validatePartyIndex(partyIndex);

    // separate out the party inventory.
    lucidScripts.lucidInventory.inventory[partyIndex] = {
      items: $gameParty._items,
      weapons: $gameParty._weapons,
      armors: $gameParty._armors,
      gold: $gameParty._gold
    };

    // Remove everything from the inventory.
    $gameParty._items = {};
    $gameParty._weapons = {};
    $gameParty._armors = {};
    $gameParty._gold = 0;
  }

  /**
   * Restore a parties inventory.
   *
   * @param {int} partyIndex - the index of the party from the parties option.
   * @return {undefined} nothing.
   */
  restore(partyIndex) {
    this.validatePartyIndex(partyIndex);

    const storedInventory = lucidScripts.lucidInventory.inventory[partyIndex];

    $gameParty._items = storedInventory.items;
    $gameParty._weapons = storedInventory.weapons;
    $gameParty._armors = storedInventory.armors;
    $gameParty._gold = storedInventory.gold;
  }

  /**
   * Merge a parties inventory with another parties.
   *
   * Cannot be undone.
   *
   * @param {int} partyIndex - the index of the party from the parties option.
   * @return {undefined} nothing.
   */
  merge(partyIndex) {
    this.validatePartyIndex(partyIndex);

    const storedInventory = lucidScripts.lucidInventory.inventory[partyIndex];

    this.mergeItems(storedInventory.items);
    this.mergeWeapons(storedInventory.weapons);
    this.mergeArmors(storedInventory.armors);
    $gameParty._gold += storedInventory.gold;
  }

  /**
   * Merge items in to the game party items.
   *
   * @param {obj} storedItems - The items that are currently stored
   * @return {undefined} nothing
   */
  mergeItems(storedItems) {
    for (var item in storedItems) {
      if (storedItems.hasOwnProperty(item)) {
        $gameParty._items[item] = ($gameParty._items[item] || 0) + storedItems[item];
      }
    }
  }

  /**
   * Merge weapons in to the game party weapons.
   *
   * @param {obj} storedWeapons - The weapons that are currently stored
   * @return {undefined} nothing
   */
  mergeWeapons(storedWeapons) {
    for (var item in storedWeapons) {
      if (storedWeapons.hasOwnProperty(item)) {
        $gameParty._items[item] = ($gameParty._items[item] || 0) + storedWeapons[item];
      }
    }
  }

  /**
   * Merge armors in to the game party armors.
   *
   * @param {obj} storedArmors - The armors that are currently stored
   * @return {undefined} nothing
   */
  mergeArmors(storedArmors) {
    for (var item in storedArmors) {
      if (storedArmors.hasOwnProperty(item)) {
        $gameParty._items[item] = ($gameParty._items[item] || 0) + storedArmors[item];
      }
    }
  }

  /**
   * Validates the party index.
   *
   * @param {int} partyIndex - the index of the party
   * @return {undefined} nothing.
   */
  validatePartyIndex(partyIndex) {
    const params = JSON.parse(lucidScripts.lucidInventory.parameters.parties);

    if (!Array.isArray(params)) {
      throw Error('parties must be an array');
    }

    if (!Array.isArray(params[partyIndex])) {
      throw Error(partyIndex + ' is not an array.');
    }

    if (params[partyIndex] === undefined) {
      throw Error(partyIndex + ' does not exist.');
    }
  }
}

// Create a window object.
window.LucidInventory = new LucidInventory();

/**
 * We want to add Lucid Scripts object to the saved data.
 */
const LucidInventory_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
  // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
  var contents = LucidInventory_DataManager_makeSaveContents.call(this);
  contents.lucidScripts = {};

  contents.lucidScripts.lucidInventory = lucidScripts.lucidInventory;
  return contents;
};

/**
 * We want to add the saved Lucid Scripts object to the main object.
 */
const LucidInventory_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
  LucidInventory_DataManager_extractSaveContents.call(this, contents);
  lucidScripts.lucidInventory = contents.lucidScripts.lucidInventory;
};
