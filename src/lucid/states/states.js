/*:
 * @plugindesc Allow states to directly affect certian stats
 *
 * @author Adam Balan
 *
 * @help
 *
 * Place <state stat: 'def' amount: +/-x%>
 *
 * stat: which stat should we increase?
 * amount: the percentage in a decimal form, eg: 0.01 is 1%
 */

const ProcessState = require('./process_state');

/**
 * Global Object - Don't touch.
 *
 * Used to hold global variables, functions and such that are used across
 * the lucid scripts
 */
window.lucidScripts = window.lucidScripts || {};

// Used to hold onto the states.
lucidScripts.lucidStates = [];

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
