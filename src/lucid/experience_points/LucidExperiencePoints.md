/*:
 * @plugindesc Allow you to set your Own EXP for each class.
 * @author Eviticous
 *
 * @help
 *
 * Must give credit. Can be used in commercial Games.
 *
 * Compatibility Issues: ???
 *
 * Place: <xpFormula: "level * 100"> in a class note box.
 *
 * This will mean that for each level they will need that level X 100,
 * so for level 3 its 3 * 100 = 300 exp before they reach level 4.
 *
 * You can also do things like: <expFormula: 100> which will set the
 * the level to 100 for all levels. This is similar to that of Final Fantasy
 * Tactics Advanced (and other such games).
 *
 * If your value is 0, we will default to the default exp system.
 *
 * Scaling across levels?
 *
 * The way this script works is you set up either a single digit value for
 * all levels up to max, or you set up a formula that then scales based on your
 * level and what you need to attain the next level.
 *
 * Example formulas:
 *
 * Notice how all the formulas below use "" around their expression,
 * this is needed only if you are creating an expression.
 *
 * If you are not creating an expression, and you want the exp to be
 * a constant 100 or X, where X is a valid integer, then you can leave
 * off the quotes.
 *
 * <expFormula: "level + 100 + (level * 1.333)">
 *
 * This states to take the next level, add 100 to it, add the level
 * multiplied by 1/3.
 *
 * <expFormula: "level + 500 * pow(level, 6)">
 *
 * This states to take the level, multiply it by 500 and then multiply that
 * by the level to the power of 6.
 *
 * <expFormula: "level + 500 * pow(level, 6) + exp level">
 *
 * This states to take the level, multiply it by 500 and then multiply that
 * by the level to the power of 6.
 *
 * Words you can use that are translated by the plugin:
 *
 * - level: This is a variable thats replaced by the actual level
 * - pow(x, y): x to the power of y
 * - exp x: Exponential x, also known as e^x
 * - ceil x: The ceiling of x
 * - floor x: The floor of x
 * - round x: Round the value of X either up or down
 *
 * Note: Your formula is automatically rounded either up or down to the
 * nearest whole integer.
 *
 * Example Formula using all supported words:
 *
 * <expFormula: "round (level + 500 * pow(level, 6) + exp level +
 *      ceil (1000 * 1.18) - 100 + floor (1000 * 1.18))">
 *
 * Evaluation Information:
 *
 * Your formulas will be pr-compiled down to bedmass, so in the example above:
 *
 * <expFormula: "level + 500 * pow(level, 6)">
 *
 * Becomes: (level + (500 * pow(level, 6))
 *
 */
