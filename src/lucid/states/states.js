const ProcessState = require('./process_state');

/*:
 * @plugindesc Allow states to directly affect certain stats
 *
 * @author Adam Balan
 *
 * @param Recover All
 * @desc an array of states to keep applied when recover all is used.
 * @default []
 *
 * @help
 *
 * Place <state stat: 'def' amount: x%, action: 'increase/decrease'>
 *
 * stat: which stat should we increase?
 * amount: the percentage in a decimal form, eg: 0.01 is 1%
 * action: increase or decrease by the amount set.
 *
 * There is a param that states, when recover all is used, all the state ID's
 * in this array will be kept attached to the player. This means that you
 * will have to manually remove the states.
 */


/**
 * Global Object - Don't touch.
 *
 * Used to hold global variables, functions and such that are used across
 * the lucid scripts
 */
window.lucidScripts = window.lucidScripts || {};

// Used to hold onto the states.
lucidScripts.lucidStates = [];
lucidScripts.lucidStatesToKeep = JSON.parse(PluginManager.parameters('LucidStates')['Recover All']);

/**
 * addState - Adds a state to the player
 *
 * We are over writing this function to add in logic to process
 * the notes and get the information we need to see what we need to do.
 *
 *
 * @param {number}  stateId - the state id, for $dataState
 * @return {undefined} nothing
 */
Game_Battler.prototype.addState = function(stateId) {
  if (this.isStateAddable(stateId)) {
    state = new ProcessState();
    stateInfoArray = state.getStateNoteObjects($dataStates[stateId]);

    if (!this.isStateAffected(stateId)) {
      this.addNewState(stateId);
      this.refresh();
    }

    this.resetStateCounts(stateId);
    this._result.pushAddedState(stateId);

    if (stateInfoArray !== null) {
      state.applyStatChanges(stateInfoArray, this);
    }
  }
};


/**
 * removeState - Removes a state to the player
 *
 * We are over writing this function to add in logic to process
 * the notes and get the information we need to see what we need to do.
 *
 * @param {number}  stateId - the state id, for $dataState
 * @return {undefined} nothing
 */
Game_Battler.prototype.removeState = function(stateId) {
  if (this.isStateAffected(stateId)) {
    state = new ProcessState();
    stateInfoArray = state.getStateNoteObjects($dataStates[stateId]);

    if (stateId === this.deathStateId()) {
      this.revive();
    }

    this.eraseState(stateId);

    if (stateInfoArray !== null) {
      state.removeStateChanges(stateInfoArray, this);
    }

    this.refresh();
    this._result.pushRemovedState(stateId);
  }
};


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

/**
 * We want to keep the states that the player might already have attached to them.
 *
 * @return {undefined} nothing
 */
const LucidStates_Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
 Game_BattlerBase.prototype.clearStates = function() {
    LucidStates_Game_BattlerBase_clearStates.call(this);
    this._states = lucidScripts.lucidStatesToKeep;
};

 /**
  * We want to add Lucid Scripts object to the saved data.
  */
 const LucidStates_DataManager_makeSaveContents = DataManager.makeSaveContents;
 DataManager.makeSaveContents = function() {
   // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
   var contents = LucidStates_DataManager_makeSaveContents.call(this);
   contents.lucidScripts = {};

   contents.lucidScripts.lucidStatesToKeep = lucidScripts.lucidStatesToKeep;
   return contents;
 };

 /**
  * We want to add the saved Lucid Scripts object to the main object.
  */
 const LucidStates_DataManager_extractSaveContents = DataManager.extractSaveContents;
 DataManager.extractSaveContents = function(contents) {
   LucidStates_DataManager_extractSaveContents.call(this, contents);
   lucidScripts.lucidStatesToKeep = contents.lucidScripts.lucidStatesToKeep;
 };
