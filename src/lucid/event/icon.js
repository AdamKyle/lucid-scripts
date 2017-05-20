/*:
 * @plugindesc Allow an event to have an icon hovering over it.
 *
 * @author Adam Balan
 *
 * @help
 *
 * Place: <eventIcon: icon_id> in a comment on a page for an event.
 *
 * When the event is being interacted with, the event will make the icon
 * lose its opacity. If the page changes and there is a new <eventIcon: icon_id>
 * on that new page, once the event is done being interacted with the icon will
 * appear and change.
 *
 * If the page changes and there is no <eventIcon: icon_id>, the icon will
 * disapear from the event.
 */

const EventSpriteIcon = require('./event_sprite_icon');
const MapEventsIcons  = require('./map_events_icons');

/**
 * Global Object - Don't touch.
 *
 * Used to hold global variables, functions and such that are used across
 * the lucid scripts
 */
window.lucidScripts = window.lucidScripts || {};

// Used to refresh the event icon.
lucidScripts.lucidEventIcon = { needRefresh: false, recreateMapIcons: false};

// Self executing Function
(() => {

  /**
   * Add a inidicator and set it to visible.
   */
  var LucidEventIcon_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    LucidEventIcon_Game_System_initialize.call(this);
    lucidScripts.lucidEventIcon.needRefresh = true;
  };

  /**
   * Instantiate a new class which sets either true or false for
   * refreshing the icon.
   *
   * @param {number} mapId - the map id
   */
  var LucidEventIcon_Game_System_requestRefresh = Game_Map.prototype.requestRefresh;
  Game_Map.prototype.requestRefresh = function(mapId) {
    LucidEventIcon_Game_System_requestRefresh.call(this, mapId);
    lucidScripts.lucidEventIcon.needRefresh = true;
  };

  var LucidEventIcon_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    LucidEventIcon_Spriteset_Map_createLowerLayer.call(this);
    this.createActionIconSprite();
  };

  /**
   * New function on the Spriteset_Map class to create the icon sprites.
   *
   * @return {undefined} nothing
   */
  Spriteset_Map.prototype.createActionIconSprite = function() {
    let mapEventsIcons = new MapEventsIcons();

    mapEventsIcons.getAllEventIcons().forEach(function(eventIcon) {
      this['_eventiconSprite_' + eventIcon.event_id] = new EventSpriteIcon(mapEventsIcons, eventIcon);
      this._tilemap.addChild(this['_eventiconSprite_' + eventIcon.event_id]);
    }, this);
  };
})();
