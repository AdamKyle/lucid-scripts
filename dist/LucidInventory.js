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
!function(r){function e(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return r[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var t={};e.m=r,e.c=t,e.i=function(r){return r},e.d=function(r,t,n){e.o(r,t)||Object.defineProperty(r,t,{configurable:!1,enumerable:!0,get:n})},e.n=function(r){var t=r&&r.__esModule?function(){return r.default}:function(){return r};return e.d(t,"a",t),t},e.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},e.p="",e(e.s=9)}({9:function(r,e){function t(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}var n=function(){function r(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}();window.lucidScripts=window.lucidScripts||{},lucidScripts.lucidInventory={},lucidScripts.lucidInventory.parameters=PluginManager.parameters("LucidInventory"),lucidScripts.lucidInventory.inventory={};var a=function(){function r(){t(this,r)}return n(r,[{key:"separate",value:function(r){this.validatePartyIndex(r),lucidScripts.lucidInventory.inventory[r]={items:$gameParty._items,weapons:$gameParty._weapons,armors:$gameParty._armors},$gameParty._items={},$gameParty._weapons={},$gameParty._armors={}}},{key:"restore",value:function(r){this.validatePartyIndex(r);var e=lucidScripts.lucidInventory.inventory[r];$gameParty._items=e.items,$gameParty._weapons=e.weapons,$gameParty._armors=e.armors}},{key:"merge",value:function(r){this.validatePartyIndex(r);var e=lucidScripts.lucidInventory.inventory[r];this.mergeItems(e.items),this.mergeWeapons(e.weapons),this.mergeArmors(e.armors)}},{key:"mergeItems",value:function(r){for(var e in r)r.hasOwnProperty(e)&&($gameParty._items[e]=($gameParty._items[e]||0)+r[e])}},{key:"mergeWeapons",value:function(r){for(var e in r)r.hasOwnProperty(e)&&($gameParty._items[e]=($gameParty._items[e]||0)+r[e])}},{key:"mergeArmors",value:function(r){for(var e in r)r.hasOwnProperty(e)&&($gameParty._items[e]=($gameParty._items[e]||0)+r[e])}},{key:"validatePartyIndex",value:function(r){var e=JSON.parse(lucidScripts.lucidInventory.parameters.parties);if(!Array.isArray(e))throw Error("parties must be an array");if(!Array.isArray(e[r]))throw Error(r+" is not an array.");if(void 0===e[r])throw Error(r+" does not exist.")}}]),r}();window.LucidInventory=new a;var i=DataManager.makeSaveContents;DataManager.makeSaveContents=function(){var r=i.call(this);return r.lucidScripts={},r.lucidScripts.lucidInventory=lucidScripts.lucidInventory,r};var o=DataManager.extractSaveContents;DataManager.extractSaveContents=function(r){o.call(this,r),lucidScripts.lucidInventory=r.lucidScripts.lucidInventory}}});