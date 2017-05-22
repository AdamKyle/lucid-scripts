const extractAll = require('rmmv-mrp-core/option-parser').extractAll;

module.exports = class ProcessState {

  getStateNoteObject(state) {
    const stateInformation = extractAll(state.note);
    let stateObjects = [];

    if (!stateInformation.length > 0) {
      return null;
    }

    stateInformation.forEach(function(stateInfo) {
      stateObjects.push({
        stat: stateInfo.stat,
        amount: stateInfo.amount
      });
    });

    return stateObjects;
  }

  setOriginalActorInfo(stateObjects, actor) {
    if (lucidScripts.lucidStates.length > 0) {
      lucidScripts.lucidStates.forEach(function(lucidState){
        if (actor._actorId === lucidState.actorId) {

          lucidState.originalStatInfo.forEach(function(statInfo){
            stateObjects.forEach(function(stateInfo){
              if (statInfo.stat !== stateInfo.stat) {
                lucidState.originalStatInfo.push({
                  stat: stateInfo.stat,
                  value: actor[stateInfo.stat]
                });
              }
            });
          });
        }
      });
    } else {
      stateObjects.forEach(function(stateInfo) {
        lucidScripts.lucidStates.push({
          actorId: actor._actorId,
          originalStatInfo: [{
            stat: stateInfo.stat,
            value: actor[stateInfo.stat]
          }]
        });
      });
    }
  }

  ApplyStatChanges(stateInfo, actor) {
    
  }
}
