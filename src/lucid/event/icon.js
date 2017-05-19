/*:
 * @plugindesc Allow an event to have an icon hovering over it.
 *
 * @author Adam Balan
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
lucidScripts.lucidEventIcon = { needRefresh: false };

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

  Spriteset_Map.prototype.createActionIconSprite = function() {
    var mapEventsIcons = new MapEventsIcons();

    mapEventsIcons.getAllEventIcons().forEach(function(eventIcon) {
      this['_eventiconSprite_' + eventIcon.event_id] = new EventSpriteIcon(eventIcon);
      this._tilemap.addChild(this['_eventiconSprite_' + eventIcon.event_id]);
      console.log(this._tilemap, this._tilemap.children);
    }, this)

    this._eventIconSprite = new EventSpriteIcon();
    this._tilemap.addChild(this._eventIconSprite);
  };
})();
