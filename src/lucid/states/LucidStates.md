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
