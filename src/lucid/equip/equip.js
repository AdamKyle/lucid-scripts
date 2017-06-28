const EquipTags = require('./equip-tags.js');

window.lucidScripts = window.lucidScripts || {};

// Used to hold onto the states.
lucidScripts.lucidEquiped = {};

/**
 * subtractParam - subtracts the current param value
 *
 * Custom method to subtract a value from the current param value.
 *
 * @param {number}  paramId - The param id
 * @param {number}  value - The value for that specific param
 * @return {undefined} nothing
 */
 Game_BattlerBase.prototype.subtractParam = function(paramId, value) {
    this._paramPlus[paramId] += value;
    this.refresh();
 };

const LucidEquip_Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
    LucidEquip_Game_Actor_changeEquip.call(this, slotId, item);

    const equipTags = new EquipTags();
    const tagObject = equipTags.getTags(item);

    if (item !== null) {

      createContainer(this);

      if (lucidScripts.lucidEquiped[this._actorId].length === 0) {
        lucidScripts.lucidEquiped[this._actorId].push({
          item: item,
          slotId: slotId
        });

        if (tagObject !== null) {
          equipTags.applyStatChanges(tagObject, this);
        }
      } else {
        const index = findEquipedItemIndex(slotId, this._actorId);
          if (index !== -1) {
            replaceItemAtIndex(this, index, item, equipTags)
          } else {
            lucidScripts.lucidEquiped[this._actorId].push({
              item: item,
              slotId: slotId
            });

            if (tagObject !== null) {
              equipTags.applyStatChanges(tagObject, this);
            }
          }
      }
    } else {
      if (Object.keys(lucidScripts.lucidEquiped).length === 0) {
        return;
      }

      if (lucidScripts.lucidEquiped[this._actorId] === undefined) {
        return;
      }

      const index = findEquipedItemIndex(slotId, this._actorId);

      if (index === -1) {
        return;
      }

      const oldItem = lucidScripts.lucidEquiped[this._actorId][index].item;
      const oldTag = equipTags.getTags(oldItem);

      if (oldTag !== null) {
        equipTags.removeStateChanges(oldTag, this);
      }

      lucidScripts.lucidEquiped[this._actorId] = [];
      loadPreEquiped();
    }
};

const LucidEquip_DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
  LucidEquip_DataManager_setupNewGame.call(this);
  loadPreEquiped(true);
};

/**
 * Replace the item at the index.
 *
 * @param {object} actor - The actor object
 * @param {int} index - The index integer
 * @param {obj} item - The item object
 * @param {EquipTags} equipTags - The equip tags class.
 * @return {undefined} nothing
 */
const replaceItemAtIndex = function(actor, index, item, equipTags) {
  const oldItem = lucidScripts.lucidEquiped[actor._actorId][index].item;
  const oldTag = equipTags.getTags(oldItem);

  if (oldTag !== null) {
    equipTags.removeStateChanges(oldTag, actor);
  }

  lucidScripts.lucidEquiped[actor._actorId][index].item = item;

  if (oldTag !== null) {
    equipTags.applyStatChanges(tagObject, actor);
  }
}

/**
 * If there is no container create it.
 *
 * @param {object} actor actor object
 * @return {undefined} nothing
 */
const createContainer = function(actor) {
  // If there are no actors, or if there no specific actor.
  if (Object.keys(lucidScripts.lucidEquiped).length === 0) {
    lucidScripts.lucidEquiped[actor._actorId] = [];
  } else if (lucidScripts.lucidEquiped[this._actorId] === undefined) {
    lucidScripts.lucidEquiped[actor._actorId] = [];
  }
}

/**
 * We want to add Lucid Scripts object to the saved data.
 */
const LucidStates_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
  // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
  var contents = LucidStates_DataManager_makeSaveContents.call(this);
  contents.lucidScripts = contents.lucidScripts || {};

  contents.lucidScripts.lucidEquiped = lucidScripts.lucidEquiped;
  return contents;
};

/**
 * We want to add the saved Lucid Scripts object to the main object.
 */
const LucidStates_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
  LucidStates_DataManager_extractSaveContents.call(this, contents);
  lucidScripts.lucidEquiped = contents.lucidScripts.lucidEquiped;
};

/**
 * Find the equiped item index.
 *
 * @param {int} slotId - The id of the slot the equipment's in
 * @param {int} actorId - The actor id
 * @return {int} -1 or index
 */
const findEquipedItemIndex = function(slotId, actorId) {
  for(var i = 0; i < lucidScripts.lucidEquiped[actorId].length; i++) {

    if (lucidScripts.lucidEquiped[actorId][i] === undefined) {
      return -1;
    }

    if (lucidScripts.lucidEquiped[actorId][i].slotId === slotId) {
      return i
    }
  }

  return  -1;
};

/**
 * Load all stats for all $gameActors, this would include pre-equiped
 *
 * @param {bool} dontApply - are we recreating the container?
 * @return {undefined} nothing
 */
const loadPreEquiped = function(dontApply) {
  const equipTags = new EquipTags();
  const dontApplyStats = dontApply || false;

  $gameActors._data.forEach(function(actor) {
    for (let i = 0; i < actor._equips.length; i++) {

      createContainer(actor);

      if (actor._equips[i]._itemId !== 0) {
        let item = actor.equips()[i];
        let tagObject = equipTags.getTags(item);

        lucidScripts.lucidEquiped[actor._actorId].push({
          item: item,
          slotId: i
        });

        if (tagObject !== null && dontApplyStats) {
          equipTags.applyStatChanges(tagObject, actor);
        }
      }
    }
  });
};
