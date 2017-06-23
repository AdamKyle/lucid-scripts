/*:
 * @plugindesc Allows you to have multiple inventories.
 * @author Eviticous
 *
 * @param parties
 * @desc an array of arrays containing actor id's to represent parties.
 * @default []
 *
 * @help
 *
 * Must give credit. Can be used in commercial Games.
 *
 * Allows you to have inventories for each set of party members, which
 * is represented by an array of arrays. For example:
 *
 * [[1,2], [3,4]] // => Zero based array.
 *
 * The above states that actors 1 and 2 in a party will have their own inventory
 * and 3 and 4 as a party will have their own inventory. This is good for
 * games where there are separate worlds or separate parties that know
 * nothing of each other.
 *
 * At any point you can call: LucidInventory.mergeInventory(0, 1)
 *
 * Which will merge party 1's inventory with party 2. Now actors 3 and 4 in
 * a party will have the inventory items from the actors in party one.
 *
 * Separating out inventory's is done by calling
 * LucidInventory.separate(0).
 *
 * This separates the inventory of actors 1 and 2, out into its own
 * stored object, this should be done before adding actors 3 and 4.
 *
 * Fetching the inventory from either party for either party is done by:
 *
 * LucidInventory.restore(0).
 *
 * This will restore the inventory (do this after seperating out and removing
 * other members) to actors 1 and 2.
 *
 * ==== Getting Set Up! ====
 *
 * The option parties is an array of party's for example:
 *
 * parties: [[1, 2], [3, 4] ...] // => Actor id's
 *
 * This is a zero based array, meaning party one is referred to as 0
 * and party 2 is referred to as 1.
 *
 * Before you remove party members 1 and 2 you would call:
 *
 * LucidInventory.separate(0);
 *
 * This will take the first parties inventory and separate it out, then empty
 * the inventory. You cannot keep some items. Its an all or nothing thing.
 *
 * This assumes that this is the first time you are doing this and that
 * there is nothing in the other parties inventory.
 *
 * In the future, after removing every one from, say the second party,
 * you would do: lucidScripts.lucidInventory.separate(1);
 *
 * This method must always be called before you remove the party members.
 * then after adding the new part party members for a different party, you call
 *
 * LucidInventory.restore(0).
 *
 * This will restore the parties inventory.
 *
 * If at any point both parties should merge you can call:
 *
 * LucidInventory.mergeInventory(1);
 *
 * After adding the new members. This will take party 2's inventory and merge
 * it into party 1's inventory. (Again a all or nothing deal.)
 *
 * There is no way to undo a merge.
 */
