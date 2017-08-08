/*:
 * @plugindesc Allows you to set the icon size for text boxes.
 * @author Eviticous
 *
 * @help
 *
 * Must give credit. Can be used in commercial Games.
 *
 * Compatibility Issues: ???
 *
 * You can change the width and height of an icon for the use of that icon
 * in a text window.
 *
 * @param Icon Height
 * @desc The height of the icon for the text window.
 * Default: 32
 * @default 32
 *
 * @param Icon Width
 * @desc The width of the icon for the text window.
 * Default: 32
 * @default 32
 *
 */
!function(i){function n(c){if(o[c])return o[c].exports;var t=o[c]={i:c,l:!1,exports:{}};return i[c].call(t.exports,t,t.exports,n),t.l=!0,t.exports}var o={};n.m=i,n.c=o,n.i=function(i){return i},n.d=function(i,o,c){n.o(i,o)||Object.defineProperty(i,o,{configurable:!1,enumerable:!0,get:c})},n.n=function(i){var o=i&&i.__esModule?function(){return i.default}:function(){return i};return n.d(o,"a",o),o},n.o=function(i,n){return Object.prototype.hasOwnProperty.call(i,n)},n.p="",n(n.s=10)}({10:function(i,n){window.lucidScripts=window.lucidScripts||{},window.lucidScripts.ludicIconSizeParams=PluginManager.parameters("LucidIconSize"),window.lucidScripts.ludicIconSizes={},window.lucidScripts.ludicIconSizes.iconHeight=Number(window.lucidScripts.ludicIconSizeParams["Icon Height"]),window.lucidScripts.ludicIconSizes.iconWidth=Number(window.lucidScripts.ludicIconSizeParams["Icon Width"]),Window_Base.prototype.processEscapeCharacter=function(i,n){switch(i){case"C":this.changeTextColor(this.textColor(this.obtainEscapeParam(n)));break;case"I":this.processDrawIcon(this.obtainEscapeParam(n),n,window.lucidScripts.ludicIconSizes.iconWidth,window.lucidScripts.ludicIconSizes.iconHeight);break;case"{":this.makeFontBigger();break;case"}":this.makeFontSmaller()}},Window_Base.prototype.processDrawIcon=function(i,n,o,c){this.drawIcon(i,n.x+2,n.y+2,o,c),n.x+=Window_Base._iconWidth+4},Window_Base.prototype.drawIcon=function(i,n,o,c,t){var e=ImageManager.loadSystem("IconSet"),r=Window_Base._iconWidth,a=Window_Base._iconHeight,s=i%16*r,d=Math.floor(i/16)*a,u=c||r,l=t||a;this.contents.blt(e,s,d,r,a,n,o,u,l)}}});