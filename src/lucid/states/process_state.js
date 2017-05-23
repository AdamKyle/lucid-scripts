const extractAll = require('rmmv-mrp-core/option-parser').extractAll;
const getParamId = require('./helpers/get_param_id').getParamId;

module.exports = class ProcessState {

  getStateNoteObjects(state) {
    const stateInformation = extractAll(state.note);
    let stateObjects = [];

    if (!stateInformation.length > 0) {
      return null;
    }

    stateInformation.forEach(function(stateInfo) {
      stateObjects.push({
        stat: stateInfo.stat,
        amount: stateInfo.amount,
        action: stateInfo.action
      });
    });

    return stateObjects;
  }



  applyStatChanges(stateObjects, actor) {
    stateObjects.forEach(function(stateInfo) {
      paramId = getParamId(stateInfo.stat);
      let newValue = 0;

      if (stateInfo.action === 'increase') {
        newValue = actor.param(paramId) * (1 + (stateInfo.amount / 100));
        actor.addParam(paramId, Math.round(newValue - actor.param(paramId)));
      } else if (stateInfo.action === 'decrease') {
        newValue = actor.param(paramId) * (1 - (stateInfo.amount / 100));
        actor.subtractParam(paramId, Math.round(newValue - actor.param(paramId)));
      } else {
        throw Error('type for the tag param must be increase or decrease.');
      }
    });
  }

  removeStateChanges(stateObjects, actor) {
    stateObjects.forEach(function(stateInfo) {
      paramId = getParamId(stateInfo.stat);

      if (stateInfo.action === 'increase') {
        newValue = actor.param(paramId) * (1 - (stateInfo.amount / 100));
        actor.subtractParam(paramId, Math.round(newValue - actor.param(paramId)));
      } else if (stateInfo.action === 'decrease') {
        newValue = actor.param(paramId) * (1 + (stateInfo.amount / 100));
        actor.addParam(paramId, Math.round(newValue - actor.param(paramId)));
      } else {
        throw Error('type for the tag param must be increase or decrease.');
      }
    });
  }
}
