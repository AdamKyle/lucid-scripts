const extractAll = require('rmmv-mrp-core/option-parser').extractAll;
const getParamId = require('../helpers/get_param_id').getParamId;

module.exports = class EquipTags {

  getTags(item) {
    if (item === null) {
      return;
    }

    const equipInformation = extractAll(item.note);
    let equipObjects = [];

    if (!equipInformation.length > 0) {
      return null;
    }

    equipInformation.forEach(function(equipInfo) {
      equipObjects.push({
        stat: equipInfo.stat,
        amount: equipInfo.amount,
        action: equipInfo.action
      });
    });

    return equipObjects;
  }

  applyStatChanges(equipObjects, actor) {
    let newValue = 0;

    equipObjects.forEach(function(equipObject) {
      let paramId = getParamId(equipObject.stat);
      if (equipObject.action === 'increase') {
        newValue = actor.param(paramId) * (1 + (equipObject.amount / 100));
        actor.addParam(paramId, Math.round(newValue - actor.param(paramId)));
      } else if (equipObject.action === 'decrease') {
        newValue = actor.param(paramId) * (1 - (equipObject.amount / 100));
        actor.subtractParam(paramId, Math.round(newValue - actor.param(paramId)));
      } else {
        throw Error('type for the tag param must be increase or decrease.');
      }
    });
  }

  removeStateChanges(equipObjects, actor) {

    if (equipObjects === null) {
      return;
    }

    let newValue = 0;

    equipObjects.forEach(function(equipObject) {
      let paramId = getParamId(equipObject.stat);

      if (equipObject.action === 'increase') {
        newValue = actor.param(paramId) / (1 + (equipObject.amount / 100));
        actor.subtractParam(paramId, Math.round(newValue - actor.param(paramId)));
      } else if (equipObject.action === 'decrease') {
        newValue = actor.param(paramId) / (1 - (equipObject.amount / 100));
        actor.addParam(paramId, Math.round(newValue - actor.param(paramId)));
      } else {
        throw Error('type for the tag param must be increase or decrease.');
      }
    });
  }
};
