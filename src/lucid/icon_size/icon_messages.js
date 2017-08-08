
/**
 * Get the plugin paramaters.
 */
window.lucidScripts = window.lucidScripts || {};
window.lucidScripts.ludicIconSizeParams =
  PluginManager.parameters('LucidIconSize');

// Lets store these some where.
window.lucidScripts.ludicIconSizes = {};

// Icon Height Param
window.lucidScripts.ludicIconSizes.iconHeight =
  Number(window.lucidScripts.ludicIconSizeParams['Icon Height']);

// Icon Width param
window.lucidScripts.ludicIconSizes.iconWidth =
  Number(window.lucidScripts.ludicIconSizeParams['Icon Width']);

Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'C':
        this.changeTextColor(this.textColor(this.obtainEscapeParam(textState)));
        break;
    case 'I':
        // Pass in two new params, icon width and height.
        this.processDrawIcon(
          this.obtainEscapeParam(textState),
          textState,
          window.lucidScripts.ludicIconSizes.iconWidth,
          window.lucidScripts.ludicIconSizes.iconHeight
        );
        break;
    case '{':
        this.makeFontBigger();
        break;
    case '}':
        this.makeFontSmaller();
        break;
    }
};

Window_Base.prototype.processDrawIcon = function(iconIndex, textState, iconWidth, iconHeight) {
    this.drawIcon(iconIndex, textState.x + 2, textState.y + 2, iconWidth, iconHeight);
    textState.x += Window_Base._iconWidth + 4;
};

Window_Base.prototype.drawIcon = function(iconIndex, x, y, iconWidth, iconHeight) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    // The optiona width and height params.
    var dw = iconWidth || pw;
    var dh = iconHeight || ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
};
