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
    stateInfo = state.getStateNoteObject($dataStates[stateId]);

    if (!this.isStateAffected(stateId)) {
      this.addNewState(stateId);
      this.refresh();
    }

    this.resetStateCounts(stateId);
    this._result.pushAddedState(stateId);

    if (stateInfo !== null) {
      state.setOriginalActorInfo(stateInfo, this);
      state.ApplyStatChanges(stateInfo, this);
    }
  }
};
