const MapEventsIcons = require('./map_events_icons');

module.exports = class EventSpriteIcon extends Sprite {

  constructor(eventIcon) {
    super();

    this.eventIconDetails = eventIcon;
  }

  initialize() {
    Sprite.prototype.initialize.call(this);

    $gamePlayer.actionIconTarget = $gamePlayer.actionIconTarget || {event_id: 0, icon_id: 0};

    this._iconIndex = 0;
    this.z = 0;

    this.changeBitmap($gamePlayer.actionIconTarget);

    this._tileWidth = $gameMap.tileWidth();
    this._tileHeight = $gameMap.tileHeight();
    this._offsetX = -(Window_Base._iconWidth / 2);
    this._offsetY = -38 + 0;
    this.anchor.y = 1;
    this._float = 0.1;
    this.mod = 2;

    this.mapEventsIcons = new MapEventsIcons();

    lucidScripts.lucidEventIcon.needRefresh = true;
  }

  changeBitmap(eventIconObject) {
    if (eventIconObject.event_id <= 0) {
      this._iconIndex = 0;
    } else {
      this._iconIndex = eventIconObject.icon_id;
    }

    if (this._iconIndex <= 0) {
      return;
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

  updateOpacity() {
    if ($gameMap.isEventRunning()) {
      this.opacity -= 40;
    } else {
      this.opacity = 255;
    }
  }

  update() {
    Sprite.prototype.update.call(this);

    if (lucidScripts.lucidEventIcon.needRefresh) {
      if (this.eventIconDetails !== undefined) {
        $gamePlayer.actionIconTarget = this.eventIconDetails
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
