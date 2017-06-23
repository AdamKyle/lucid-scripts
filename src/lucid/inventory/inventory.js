// Initilize the main container.
window.lucidScripts = window.lucidScripts || {};
lucidScripts.lucidInventory = {};

/*:
 * @plugindesc Allows you to have multiple inventories.
 *
 * @author Eviticous
 *
 * @param parties
 * @desc an array of arrays containing actor id's to represent parties.
 * @default []
 *
 * @help
 *
 * Must give credit. Can be used in commercial Games.
 *
 * Allows you to have inventories for each set of party members, which
 * is represented by an array of arrays. For example:
 *
 * [[1,2], [3,4]] // => Zero based array.
 *
 * The above states that actors 1 and 2 in a party will have their own inventory
 * and 3 and 4 as a party will have their own inventory. This is good for
 * games where there are separate worlds or separate parties that know
 * nothing of each other.
 *
 * At any point you can call: lucidScripts.lucidInventory.mergeInventory(0, 1)
 *
 * Which will merge party 1's inventory with party 2. Now actors 3 and 4 in
 * a party will have the inventory items from the actors in party one.
 *
 * Separating out inventory's is done by calling
 * lucidScripts.lucidInventory.separate(0).
 *
 * This separates the inventory of actors 1 and 2, out into its own
 * stored object, this should be done before adding actors 3 and 4.
 *
 * Fetching the inventory from either party for either party is done by:
 *
 * lucidScripts.lucidInventory.restore(0).
 *
 * This will restore the inventory (do this after seperating out and removing
 * other members) to actors 1 and 2.
 *
 * ==== Getting Set Up! ====
 *
 * The option parties is an array of party's for example:
 *
 * parties: [[1, 2], [3, 4] ...] // => Actor id's
 *
 * This is a zero based array, meaning party one is referred to as 0
 * and party 2 is referred to as 1.
 *
 * Before you remove party members 1 and 2 you would call:
 *
 * lucidScripts.lucidInventory.separate(0);
 *
 * This will take the first parties inventory and separate it out, then empty
 * the inventory. You cannot keep some items. Its an all or nothing thing.
 *
 * This assumes that this is the first time you are doing this and that
 * there is nothing in the other parties inventory.
 *
 * In the future, after removing every one from, say the second party,
 * you would do: lucidScripts.lucidInventory.separate(1);
 *
 * This method must always be called before you remove the party members.
 * then after adding the new part party members for a different party, you call
 *
 * lucidScripts.lucidInventory.restore(0).
 *
 * This will restore the parties inventory.
 *
 * If at any point both parties should merge you can call:
 *
 * lucidScripts.lucidInventory.mergeInventory(1);
 *
 * After adding the new members. This will take party 2's inventory and merge
 * it into party 1's inventory. (Again a all or nothing deal.)
 *
 * There is no way to undo a merge.
 */
lucidScripts.lucidInventory.parameters = PluginManager.parameters('LucidInventory');
lucidScripts.lucidInventory.inventory = {};

(() => {
/**
 * separates out the party inventory.
 *
 * @param {int} partyIndex - the index of the party from the parties option.
 * @return {undefined} nothing.
 */
lucidScripts.lucidInventory.separate = (partyIndex) => {
  validatePartyIndex(partyIndex);

  // separate out the party inventory.
  lucidScripts.lucidInventory.inventory[partyIndex] = {
    items: $gameParty._items,
    weapons: $gameParty._weapons,
    armors: $gameParty._armors
  };

  // Remove everything from the inventory.
  $gameParty._items = {};
  $gameParty._weapons = {};
  $gameParty._armors = {};
};

/**
 * Restores the parties inventory.
 *
 * @param {int} partyIndex - the index of the party.
 * @return {undefined} nothing.
 */
lucidScripts.lucidInventory.prototype.restore = (partyIndex) => {
  validatePartyIndex(partyIndex);

  const storedInventory = lucidScripts.lucidInventory.inventory[partyIndex];

  $gameParty._items = storedInventory.items;
  $gameParty._weapons = storedInventory.weapons;
  $gameParty._armors = storedInventory.armors;
};

/**
 * Merge two inventories together.
 *
 * @param {int} partyIndex - the index of the party.
 * @return {undefined} nothing
 */
lucidScripts.lucidInventory.merge = (partyIndex) => {
  validatePartyIndex(partyIndex);

  const currentInventory = {
    items: $gameParty._items,
    weapons: $gameParty._weapons,
    armors: $gameParty._armors
  };

  const storedInventory = lucidScripts.lucidInventory.inventory[partyIndex];

  if (JSON.stringify(currentInventory.items) === JSON.stringify(storedInventory.items)) {
    throw Error(
      'You cannot merge your own inventory, into your current inventory.'
    );
  } else {
    mergeItems(storedInventory.items);
    mergeWeapons(storedInventory.weapons);
    mergeArmors(storedInventory.armors);
  }
};

/**
 * Merge items in to the game party items.
 *
 * @param {obj} storedItems - The items that are currently stored
 * @return {undefined} nothing
 */
const mergeItems = (storedItems) => {
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
const mergeWeapons = (storedWeapons) => {
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
const mergeArmors = (storedArmors) => {
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
const validatePartyIndex = (partyIndex) => {
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
};
})();

/**
 * We want to add Lucid Scripts object to the saved data.
 */
const LucidEventIcon_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
    var contents = LucidEventIcon_DataManager_makeSaveContents.call(this);
    contents.lucidScripts = {};

    contents.lucidScripts.lucidInventory = lucidScripts.lucidInventory;
    console.log(contents.lucidScripts.lucidInventory);
    return contents;
};

/**
 * We want to add the saved Lucid Scripts object to the main object.
 */
const LucidEventIcon_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    console.log(contents);
    LucidEventIcon_DataManager_extractSaveContents.call(this, contents);
    lucidScripts.lucidInventory = contents.lucidScripts.lucidInventory;
};
