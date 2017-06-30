const extractAll = require('rmmv-mrp-core/option-parser').extractAll;
const Parser = require('expr-eval').Parser;

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

  // If just a plain number, return 0.
  // Example, if level needed 100 then we can reset to 0.
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
