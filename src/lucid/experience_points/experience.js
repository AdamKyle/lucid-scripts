const extractAll = require('rmmv-mrp-core/option-parser').extractAll;
const Parser = require('expr-eval').Parser;

require('string.prototype.includes');

window.lucidScripts = window.lucidScripts || {};


/**
 * We completly change the way this leveling works. We can pass in math
 * formulas that allow you to set the exp for the next level.
 */
let lucidExperiencePoints_GameActor_ExperienceForLevel = Game_Actor.prototype.expForLevel;
Game_Actor.prototype.expForLevel = function(level) {
  const c = this.currentClass();
  const currentClassNote = extractAll(c.note);

  // Not note tag? Use default system.
  if (currentClassNote.length === 0) {
    return lucidExperiencePoints_GameActor_ExperienceForLevel.call(this, level);
  }

  // Should the level be 1, return 0.
  if (level === 1) {
     return 0;
  }

  // If just a plain number, return it.
  if (!isNaN(currentClassNote[0].expFormula)) {
    return 0;
  }

  return Math.round(
    // Evaluate the math formula, replacing 'level' with level.
    Parser.evaluate(
      currentClassNote[0].expFormula,
      {
        level: level
      }
    )
  );
};

/**
 * Over ride the default formula only if the user set single didgit for the
 * forumal. eg: 100
 */
let lucidExperiencePoints_GameActor_NextLevelEXP = Game_Actor.prototype.nextLevelExp;
Game_Actor.prototype.nextLevelExp = function() {
    const currentClassNote = extractAll(this.currentClass().note);

    // Not note tag? Use default system.
    if (currentClassNote.length === 0) {
      return lucidExperiencePoints_GameActor_NextLevelEXP.call(this);
    }

    if (!isNaN(currentClassNote[0].expFormula)) {
      return currentClassNote[0].expFormula;
    } else {
      return lucidExperiencePoints_GameActor_NextLevelEXP.call(this);
    }
};

/**
 * Over ride the default level up, only if the user set a single digit for the
 * formula, for example: 100. This way they only level up once, regardless of
 * how much exp was awarded to them.
 */
let lucidExperiencePoints_GameActor_LevelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
  const currentClassNote = extractAll(this.currentClass().note);

  // Not note tag? Use default system.
  if (currentClassNote.length === 0) {
    return lucidExperiencePoints_GameActor_LevelUp.call(this);
  }

  if (!isNaN(currentClassNote[0].expFormula)) {
    lucidExperiencePoints_GameActor_LevelUp.call(this);
    this._exp[this._classId] = 0;
  } else {
    return lucidExperiencePoints_GameActor_LevelUp.call(this);
  }
};
