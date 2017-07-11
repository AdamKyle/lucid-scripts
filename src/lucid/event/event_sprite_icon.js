const MapEventsIcons = require('./map_events_icons');

/**
 * Event prite Icon.
 *
 * Responsible for creating the icon above the event.
 *
 * Sprite is apart of Rpg Maker MV Library.
 */
module.exports = class EventSpriteIcon extends Sprite {

  constructor(mapEventsIcons, eventIcon) {
    super();

    this.eventIconDetails = eventIcon;
    this.mapEventsIcons = mapEventsIcons;
  }

  /**
   * Called when the class is regsitered.
   *
   * We also make call to the Sprite initialize method.
   *
   * @return {undefined} - nothing
   */
  initialize() {
    super.initialize.call(this);

    $gamePlayer.actionIconTarget = $gamePlayer.actionIconTarget || {event_id: 0, icon_id: 0};

    this._iconIndex = 0;
    this.z = 100;

    this.changeBitmap($gamePlayer.actionIconTarget);

    this._tileWidth = $gameMap.tileWidth();
    this._tileHeight = $gameMap.tileHeight();
    this._offsetX = -(Window_Base._iconWidth / 2);
    this._offsetY = -38;
    this.anchor.y = 1;
    this._float = 0.1;
    this.mod = 0.2;

    this.mapEventsIcons = new MapEventsIcons();

    lucidScripts.lucidEventIcon.needRefresh = true;
  }

  /**
   * Creates the actual icon object baed on the id of the icon.
   *
   * When you call: <eventIcon: 7> we then create an icon that
   * references id 7 of the list of icons.
   *
   * This icon is then placed above the event.
   *
   * @param {object} eventIconObject object: {event_id: id, icon_id: id}
   * @return {undefined} - null
   */
  changeBitmap(eventIconObject) {
    if (eventIconObject.event_id <= 0) {
      this._iconIndex = 0;
    } else {
      this._iconIndex = eventIconObject.icon_id;
    }

    const pw = Window_Base._iconWidth;
    const ph = Window_Base._iconHeight;
    const sx = this._iconIndex % 16 * pw;
    const sy = Math.floor(this._iconIndex / 16) * ph;
    const bitmap = ImageManager.loadSystem('IconSet');

    this.bitmap = new Bitmap(pw,ph);
    this.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);

    this.scale.y = 0.1;
    this.opacity = 0;
    this.mod = 0.2;
    this._float = 0.1;

    lucidScripts.lucidEventIcon.needRefresh = false;
  }

  /**
   * If the event in question is running, we make the icon dissapear.
   *
   * If the event is not running, we display the icon.
   *
   * This allows us to have multiple events on the same scene with different icons.
   *
   * @return {undefined} - nothing
   */
  updateOpacity() {
    if ($gameMap.isEventRunning() && $gameMap._interpreter.eventId() === this.eventIconDetails.event_id) {
      this.opacity -= 40;
    } else {
      this.opacity = 255;
    }
  }

  /**
   * Common update method. Run every tick.
   *
   * To display all event icons we call: $gameMap.requestRefresh()
   *
   * This allows all icons to be displayed on the map over all events.
   *
   * We build and update any icons that are either showing or not showing
   * and position the icon above the appropriate event.
   *
   * @return{undefined} - nothing
   */
  update() {
    super.update.call(this);

    // Always update the icon.
    this.eventIconDetails = this.mapEventsIcons.getEventIcon(this.eventIconDetails.event_id);

    // Refresh the map to show all icons.
    $gameMap.requestRefresh();
    console.log('Here');

    if (lucidScripts.lucidEventIcon.needRefresh) {
      if (this.eventIconDetails !== undefined) {
        $gamePlayer.actionIconTarget = this.eventIconDetails;
      }
    }

    if (this._iconIndex !== $gamePlayer.actionIconTarget.icon_id) {
      this.changeBitmap($gamePlayer.actionIconTarget);
    }

    if (this._iconIndex <= 0) {
      return;
    }

    this.x =
      $gameMap.event($gamePlayer.actionIconTarget.event_id).screenX() +
      this._offsetX;

    this.y =
      $gameMap.event($gamePlayer.actionIconTarget.event_id).screenY() +
      this._offsetY + this._float;

    this.scale.y = Math.min(this.scale.y + 0.1,1);

    this.updateOpacity();

    this._float += this.mod;

    if (this._float < -0.1) {
      this.mod = Math.min(this.mod + 0.01,0.2);
    } else if (this._float >= 0.1) {
      this.mod = Math.max(this.mod + -0.01,-0.2);
    }
  }
};
