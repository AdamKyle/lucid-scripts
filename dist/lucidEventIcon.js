<<<<<<< HEAD
!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();e.exports=function(){function e(){n(this,e)}return i(e,[{key:"getAllEventIcons",value:function(){var e=[];return $gameMap._events.forEach(function(t){if(void 0!==t)for(var n=t.page().list.length,i=0;i<n;i++)if(108===t.page().list[i].code){var o=t.page().list[i].parameters[0].match(/<eventIcon: (.*)>/i);o&&e.push({event_id:t._eventId,icon_id:Number(o[1])})}}),e}},{key:"getEventIcon",value:function(e){for(var t=$gameMap.event(e),n=t.page().list.length,i=0;i<n;i++){if(108===t.page().list[i].code){var o=t.page().list[i].parameters[0].match(/<eventIcon: (.*)>/i);return o?{event_id:t._eventId,icon_id:Number(o[1])}:{event_id:t._eventId,icon_id:0}}return{event_id:t._eventId,icon_id:0}}}}]),e}()},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),c=function e(t,n,i){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,n,i)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(i)},s=n(0);e.exports=function(e){function t(e,n){i(this,t);var r=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return r.eventIconDetails=n,r.mapEventsIcons=e,r}return r(t,e),a(t,[{key:"initialize",value:function(){c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"initialize",this).call(this),$gamePlayer.actionIconTarget=$gamePlayer.actionIconTarget||{event_id:0,icon_id:0},this._iconIndex=0,this.z=100,this.changeBitmap($gamePlayer.actionIconTarget),this._tileWidth=$gameMap.tileWidth(),this._tileHeight=$gameMap.tileHeight(),this._offsetX=-Window_Base._iconWidth/2,this._offsetY=-38,this.anchor.y=1,this._float=.1,this.mod=.2,this.mapEventsIcons=new s,lucidScripts.lucidEventIcon.needRefresh=!0}},{key:"changeBitmap",value:function(e){if(e.event_id<=0?this._iconIndex=0:this._iconIndex=e.icon_id,!(this._iconIndex<=0)){var t=Window_Base._iconWidth,n=Window_Base._iconHeight,i=this._iconIndex%16*t,o=Math.floor(this._iconIndex/16)*n,r=ImageManager.loadSystem("IconSet");this.bitmap=new Bitmap(t,n),this.bitmap.blt(r,i,o,t,n,0,0),this.scale.y=.1,this.opacity=0,this.mod=.2,this._float=.1,lucidScripts.lucidEventIcon.needRefresh=!1}}},{key:"updateOpacity",value:function(){$gameMap.isEventRunning()&&$gameMap._interpreter.eventId()===this.eventIconDetails.event_id?this.opacity-=40:this.opacity=255}},{key:"update",value:function(){c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"update",this).call(this),$gameMap.requestRefresh(),this.eventIconDetails=this.mapEventsIcons.getEventIcon(this.eventIconDetails.event_id),lucidScripts.lucidEventIcon.needRefresh&&void 0!==this.eventIconDetails&&($gamePlayer.actionIconTarget=this.eventIconDetails),this._iconIndex!==$gamePlayer.actionIconTarget.icon_id&&this.changeBitmap($gamePlayer.actionIconTarget),this._iconIndex<=0||(this.x=$gameMap.event($gamePlayer.actionIconTarget.event_id).screenX()+this._offsetX,this.y=$gameMap.event($gamePlayer.actionIconTarget.event_id).screenY()+this._offsetY+this._float,this.scale.y=Math.min(this.scale.y+.1,1),this.updateOpacity(),this._float+=this.mod,this._float<-.1?this.mod=Math.min(this.mod+.01,.2):this._float>=.1&&(this.mod=Math.max(this.mod+-.01,-.2)))}}]),t}(Sprite)},function(e,t,n){var i=n(1),o=n(0);window.lucidScripts=window.lucidScripts||{},lucidScripts.lucidEventIcon={needRefresh:!1,recreateMapIcons:!1},function(){var e=Game_System.prototype.initialize;Game_System.prototype.initialize=function(){e.call(this),lucidScripts.lucidEventIcon.needRefresh=!0};var t=Game_Map.prototype.requestRefresh;Game_Map.prototype.requestRefresh=function(e){t.call(this,e),lucidScripts.lucidEventIcon.needRefresh=!0};var n=Spriteset_Map.prototype.createLowerLayer;Spriteset_Map.prototype.createLowerLayer=function(){n.call(this),this.createActionIconSprite()},Spriteset_Map.prototype.createActionIconSprite=function(){var e=new o;e.getAllEventIcons().forEach(function(t){this["_eventiconSprite_"+t.event_id]=new i(e,t),this._tilemap.addChild(this["_eventiconSprite_"+t.event_id])},this)}}()}]);
=======
/******/ !function(e) {
    /******/
    /******/
    // The require function
    /******/
    function t(r) {
        /******/
        /******/
        // Check if module is in cache
        /******/
        if (n[r]) /******/
        return n[r].exports;
        /******/
        // Create a new module (and put it into the cache)
        /******/
        var o = n[r] = {
            /******/
            i: r,
            /******/
            l: !1,
            /******/
            exports: {}
        };
        /******/
        /******/
        // Return the exports of the module
        /******/
        /******/
        /******/
        // Execute the module function
        /******/
        /******/
        /******/
        // Flag the module as loaded
        /******/
        return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }
    // webpackBootstrap
    /******/
    // The module cache
    /******/
    var n = {};
    /******/
    /******/
    // Load entry module and return exports
    /******/
    /******/
    /******/
    /******/
    // expose the modules object (__webpack_modules__)
    /******/
    t.m = e, /******/
    /******/
    // expose the module cache
    /******/
    t.c = n, /******/
    /******/
    // identity function for calling harmony imports with the correct context
    /******/
    t.i = function(e) {
        return e;
    }, /******/
    /******/
    // define getter function for harmony exports
    /******/
    t.d = function(e, n, r) {
        /******/
        t.o(e, n) || /******/
        Object.defineProperty(e, n, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: r
        });
    }, /******/
    /******/
    // getDefaultExport function for compatibility with non-harmony modules
    /******/
    t.n = function(e) {
        /******/
        var n = e && e.__esModule ? /******/
        function() {
            return e.default;
        } : /******/
        function() {
            return e;
        };
        /******/
        /******/
        return t.d(n, "a", n), n;
    }, /******/
    /******/
    // Object.prototype.hasOwnProperty.call
    /******/
    t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, /******/
    /******/
    // __webpack_public_path__
    /******/
    t.p = "", t(t.s = 2);
}([ /* 0 */
/***/
function(e, t, n) {
    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }
    var o = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
        };
    }(), i = n(3).extractAll;
    /**
 * Process all event icons on the map.
 *
 */
    e.exports = function() {
        function e() {
            r(this, e);
        }
        return o(e, [ {
            key: "getAllEventIcons",
            /**
     * Responsible for getting all event icons for a given map and all its events.
     *
     * @return {array} - array of objects.
     */
            value: function() {
                var e = [];
                // Loop over the events.
                return $gameMap._events.forEach(function(t) {
                    if (void 0 !== t) // Loop over the event page count
                    for (var n = t.page().list.length, r = 0; r < n; r++) // If the event code is a comment.
                    if (108 === t.page().list[r].code) {
                        // get the icon assuming there is a tag that matches:
                        var o = i(t.page().list[r].parameters[0]);
                        o.length > 0 && // Create the icon object with event id and icon id.
                        e.push({
                            event_id: o[0].event || t._eventId,
                            icon_id: Number(o[0].icon)
                        });
                    }
                }), e;
            }
        }, {
            key: "getEventIcon",
            value: function(e) {
                for (var t = $gameMap.event(e), n = t.page().list.length, r = 0; r < n; r++) {
                    if (108 === t.page().list[r].code) {
                        var o = i(t.page().list[r].parameters[0]);
                        return o.length > 0 ? {
                            event_id: t._eventId,
                            icon_id: Number(o[0].icon)
                        } : {
                            event_id: t._eventId,
                            icon_id: 0
                        };
                    }
                    return {
                        event_id: t._eventId,
                        icon_id: 0
                    };
                }
            }
        } ]), e;
    }();
}, /* 1 */
/***/
function(e, t, n) {
    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }
    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }
    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }
    var a = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
        };
    }(), c = function e(t, n, r) {
        null === t && (t = Function.prototype);
        var o = Object.getOwnPropertyDescriptor(t, n);
        if (void 0 === o) {
            var i = Object.getPrototypeOf(t);
            return null === i ? void 0 : e(i, n, r);
        }
        if ("value" in o) return o.value;
        var a = o.get;
        if (void 0 !== a) return a.call(r);
    }, u = n(0);
    /**
 * Event prite Icon.
 *
 * Responsible for creating the icon above the event.
 *
 * Sprite is apart of Rpg Maker MV Library.
 */
    e.exports = function(e) {
        function t(e, n) {
            r(this, t);
            var i = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            return i.eventIconDetails = n, i.mapEventsIcons = e, i;
        }
        /**
   * Called when the class is regsitered.
   *
   * We also make call to the Sprite initialize method.
   *
   * @return {undefined} - nothing
   */
        return i(t, e), a(t, [ {
            key: "initialize",
            value: function() {
                c(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "initialize", this).call(this), 
                $gamePlayer.actionIconTarget = $gamePlayer.actionIconTarget || {
                    event_id: 0,
                    icon_id: 0
                }, this._iconIndex = 0, this.z = 100, this.changeBitmap($gamePlayer.actionIconTarget), 
                this._tileWidth = $gameMap.tileWidth(), this._tileHeight = $gameMap.tileHeight(), 
                this._offsetX = -Window_Base._iconWidth / 2, this._offsetY = -38, this.anchor.y = 1, 
                this._float = .1, this.mod = .2, this.mapEventsIcons = new u(), lucidScripts.lucidEventIcon.needRefresh = !0;
            }
        }, {
            key: "changeBitmap",
            value: function(e) {
                e.event_id <= 0 ? this._iconIndex = 0 : this._iconIndex = e.icon_id;
                var t = Window_Base._iconWidth, n = Window_Base._iconHeight, r = this._iconIndex % 16 * t, o = Math.floor(this._iconIndex / 16) * n, i = ImageManager.loadSystem("IconSet");
                this.bitmap = new Bitmap(t, n), this.bitmap.blt(i, r, o, t, n, 0, 0), this.scale.y = .1, 
                this.opacity = 0, this.mod = .2, this._float = .1, lucidScripts.lucidEventIcon.needRefresh = !1;
            }
        }, {
            key: "updateOpacity",
            value: function() {
                $gameMap.isEventRunning() && $gameMap._interpreter.eventId() === this.eventIconDetails.event_id ? this.opacity -= 40 : this.opacity = 255;
            }
        }, {
            key: "update",
            value: function() {
                c(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "update", this).call(this), 
                // Always update the icon.
                this.eventIconDetails = this.mapEventsIcons.getEventIcon(this.eventIconDetails.event_id), 
                // Refresh the map to show all icons.
                $gameMap.requestRefresh(), lucidScripts.lucidEventIcon.needRefresh && void 0 !== this.eventIconDetails && ($gamePlayer.actionIconTarget = this.eventIconDetails), 
                //console.log(this._iconIndex, $gamePlayer.actionIconTarget.icon_id);
                this._iconIndex !== $gamePlayer.actionIconTarget.icon_id && this.changeBitmap($gamePlayer.actionIconTarget), 
                this._iconIndex <= 0 || (this.x = $gameMap.event($gamePlayer.actionIconTarget.event_id).screenX() + this._offsetX, 
                this.y = $gameMap.event($gamePlayer.actionIconTarget.event_id).screenY() + this._offsetY + this._float, 
                this.scale.y = Math.min(this.scale.y + .1, 1), this.updateOpacity(), this._float += this.mod, 
                this._float < -.1 ? this.mod = Math.min(this.mod + .01, .2) : this._float >= .1 && (this.mod = Math.max(this.mod + -.01, -.2)));
            }
        } ]), t;
    }(Sprite);
}, /* 2 */
/***/
function(e, t, n) {
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
    var r = n(1), o = n(0);
    /**
 * Global Object - Don't touch.
 *
 * Used to hold global variables, functions and such that are used across
 * the lucid scripts
 */
    window.lucidScripts = window.lucidScripts || {}, // Used to refresh the event icon.
    lucidScripts.lucidEventIcon = {
        needRefresh: !1,
        recreateMapIcons: !1
    }, // Self executing Function
    function() {
        /**
   * Add a inidicator and set it to visible.
   */
        var e = Game_System.prototype.initialize;
        Game_System.prototype.initialize = function() {
            e.call(this), lucidScripts.lucidEventIcon.needRefresh = !0;
        };
        /**
   * Instantiate a new class which sets either true or false for
   * refreshing the icon.
   *
   * @param {number} mapId - the map id
   */
        var t = Game_Map.prototype.requestRefresh;
        Game_Map.prototype.requestRefresh = function(e) {
            t.call(this, e), lucidScripts.lucidEventIcon.needRefresh = !0;
        };
        var n = Spriteset_Map.prototype.createLowerLayer;
        Spriteset_Map.prototype.createLowerLayer = function() {
            n.call(this), this.createActionIconSprite();
        }, /**
   * New function on the Spriteset_Map class to create the icon sprites.
   *
   * @return {undefined} nothing
   */
        Spriteset_Map.prototype.createActionIconSprite = function() {
            var e = new o();
            e.getAllEventIcons().forEach(function(t) {
                this["_eventiconSprite_" + t.event_id] = new r(e, t), this._tilemap.addChild(this["_eventiconSprite_" + t.event_id]);
            }, this);
        };
    }();
}, /* 3 */
/***/
function(e, t, n) {
    "use strict";
    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    function o(e) {
        return e && "undefined" != typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
    }
    /*

Grammar:

OPTS = < ARGS > | < IDENT : ARGS >
ARGS = ARG | ARGS , ARG
ARG = KEY : VAL | VAL

*/
    // Parses a list of arguments.
    function i(e) {
        for (var t, n, r, i = {
            args: []
        }; t = a(e); ) {
            // We want to support two different syntaxes, because the RPG Maker
            // community has ridiculous conventions:
            //
            //     <currency value: 10, name: Gold Stars>
            //
            // In the above, a comma separates key-value pairs. But we also want to
            // support,
            //
            //     <currency value: 10 name: Gold Stars>
            //
            // Where the commas between key value pairs are optional. However, commas
            // are still required between positional args. So this is,
            //
            //     <currency value: 10 name: Gold Stars foo, bar, baz>
            //
            // is not valid, because it's ambiguous -- either of these two
            // interpretatations are reasonable:
            //
            //     { ..., name: "Gold Stars", args: ["foo", "bar", "baz"] }
            //
            //     { ..., name: "Gold Stars foo", args: ["bar", "baz"] }
            //
            // If it weren't for allowing bare strings, everything would be okay. :)
            //
            // So there's a couple of things we have to do. First, we need to modify
            // our bare-string lexer (already done) not to lex multi-word bare strings
            // ending with a key and a colon. This is so that,
            //
            //     <currency name: Gold Stars value: 10>
            //
            // lexes into ..., Token('BARESTRING', 'Gold Stars'), Token('KEY', 'value'), ...
            // instead of ..., Token('BARESTRING', 'Gold Stars value'), Token('KEYVALSEP', ':'), ...
            //
            // Next, if we parse a key-value pair we need to see what token follows it.
            // It may either be
            //
            // 1. A comma, in which case we're done checking. We move onto the next
            //    iteration.
            // 2. A key-value pair, in which case we proceed like above, but we don't
            //    skip over the comma. (Since there isn't one.)
            // 3. A closing ket.
            //
            // All other following tokens are invalid.
            var c = t, u = b(c, 2);
            if (n = u[0], r = u[1], "object" === (void 0 === n ? "undefined" : o(n))) {
                i = I({}, i, n);
                var l = r.ofType("COMMA"), f = r.ofType("KEY") && r.advance().ofType("KEYVALSEP");
                if (l) e = r.advance(); else {
                    if (!f) return [ i, r ];
                    e = r;
                }
            } else {
                if (i = I({}, i, {
                    args: i.args.concat(n)
                }), r.empty || "COMMA" != r.get().type) return [ i, r ];
                e = r.advance();
            }
        }
        return [ i, e ];
    }
    // Parses an argument - either a key-value pair or a positional argument.
    function a(e) {
        return c(e) || u(e);
    }
    // Parses a key-value pair.
    function c(e) {
        if (e.length < 3) return null;
        if (!e.ofType("KEY") || !e.advance().ofType("KEYVALSEP")) return null;
        var t = u(e.advance(2));
        return t ? [ r({}, e.get().token, t[0]), e.advance(3) ] : null;
    }
    // Parses the value from a key-value pair, or a bare value as a positional
    // argument.
    function u(e) {
        if (e.empty) return null;
        var t = e.get(), n = t.token;
        switch (t.type) {
          case "NUMBER":
            return [ Number(n), e.advance() ];

          case "QUOTEDSTRING":
            return [ B(n), e.advance() ];

          case "BARESTRING":
          case "KEY":
            return [ n, e.advance() ];

          case "BOOLEAN":
            return [ "true" === n.toLowerCase(), e.advance() ];

          default:
            return null;
        }
    }
    // Parses an "anonymous" object, that is one without a name.
    //
    // Example:
    //
    //   <foo: 123, bar: "baz">
    function l(e) {
        if (e.length < 3) return null;
        if (!e.ofType("BRA")) return null;
        var t = i(e.advance());
        if (!t) return null;
        var n = b(t, 2), r = n[0], o = n[1];
        return o.ofType("KET") ? [ r, o.advance() ] : null;
    }
    // Parses a "named" object.
    //
    // Example:
    //
    //   <Currency name: "Foo">
    function f(e) {
        if (e.length < 3) return null;
        var t = e.advance();
        if (!e.ofType("BRA") || !t.ofType("IDENTIFIER")) return null;
        var n = i(e.advance(2));
        if (!n) return null;
        var r = b(n, 2), o = r[0], a = r[1];
        if (!a.ofType("KET")) return null;
        // e.g. Currency
        var c = t.get().token, u = p(function(e) {
            return s([ "BRA", "SLASH", "IDENTIFIER", "KET" ], e) && e.advance(2).get().token === c;
        }, a.advance());
        if (u) {
            var l = a.get().string, f = l.slice(a.get().pos + 1, u.get().pos);
            return [ I({}, o, {
                type: c,
                block: D(f)
            }), u.advance(4) ];
        }
        return [ I({}, o, {
            type: c
        }), a.advance() ];
    }
    // true if the stream is pointing at the given sequence of token names
    function s(e, t) {
        for (var n = 0; n < e.length; n++) if (!t.advance(n).ofType(e[n])) return !1;
        return !0;
    }
    // Looks for a sequence of tokens somewhere ahead in the stream.
    //
    // If present, returns the stream starting at the match.
    //
    // Otherwise returns null.
    function p(e, t) {
        for (;t.present; ) {
            if (e(t)) return t;
            t = t.advance();
        }
        return null;
    }
    function v(e) {
        return l(e) || f(e);
    }
    function h(e) {
        var t = v(e);
        return t ? t[0] : null;
    }
    function d(e) {
        return h((0, S.TokenStream)(L(e)));
    }
    // Extract all tags contained inside a possibly-unrelated string of text.
    function y(e) {
        for (var t = (0, S.TokenStream)(L(e)), n = []; t.present; ) {
            var r = v(t);
            r ? (n.push(r[0]), t = r[1]) : t = t.advance();
        }
        return n;
    }
    function g(e) {
        return function(t) {
            for (var n = (0, S.TokenStream)(L(t)); n.present; ) {
                var r = v(n);
                if (r && e(r[0])) return r[0];
                n = n.advance();
            }
            return null;
        };
    }
    function m(e, t) {
        return g(function(e) {
            return e.type === t;
        })(e);
    }
    function _(e, t) {
        return y(e).filter(function(e) {
            return e.type === t;
        });
    }
    var I = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
    }, b = function() {
        function e(e, t) {
            var n = [], r = !0, o = !1, i = void 0;
            try {
                for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), 
                !t || n.length !== t); r = !0) ;
            } catch (e) {
                o = !0, i = e;
            } finally {
                try {
                    !r && c.return && c.return();
                } finally {
                    if (o) throw i;
                }
            }
            return n;
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
    }();
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.extractFirst = t._tokenize = void 0, t.parse = d, t.extractAll = y, t.extractFirstOfType = m, 
    t.extractAllOfType = _;
    var S = n(4), E = (0, S.regex)("BRA", /</), T = (0, S.regex)("KET", />/), w = (0, 
    S.skip)((0, S.regex)("WHITESPACE", /\s+/)), O = (0, S.regex)("IDENTIFIER", /[a-zA-Z_][a-zA-Z0-9-_]*/), k = (0, 
    S.regex)("KEY", /[a-zA-Z_][a-zA-Z0-9-_]*/), x = (0, S.regex)("KEYVALSEP", /:/), A = ((0, 
    S.seq)(k, (0, S.optional)(w), x), (0, S.regex)("SLASH", /\//)), M = (0, S.regex)("SIGNIFICANT_WHITESPACE", /\s+/), R = (0, 
    S.regex)("BAREWORD", /[^,:><"\s]+/), P = (0, S.concat)("BARESTRING", (0, S.seq)(R, (0, 
    S.repeat)((0, S.notFollowedBy)((0, S.seq)(M, R), (0, S.seq)((0, S.optional)(w), x))))), B = function(e) {
        return JSON.parse(e.replace(/\n/g, "\\n"));
    }, j = (0, S.regex)("COMMA", /,/), C = (0, S.regex)("NUMBER", /-?[0-9]+(\.[0-9]+)?/), N = (0, 
    S.regex)("BOOLEAN", /(true|false)/, "i"), $ = (0, S.regex)("QUOTEDSTRING", /"(\\.|[^"\\])*"/), L = (0, 
    S.Lexer)((0, S.or)(w, // <key: "val">
    // ^
    E, // <key: "val">
    //            ^
    T, // <one: 1, two: 2>
    //        ^
    j, // <key: "val">
    //  ^^^^
    (0, S.seq)(k, (0, S.optional)(w), x), // <Identifier key: "val">
    //  ^^^^^^^^^^
    (0, S.seq)((0, S.precededByToken)("BRA"), (0, S.optional)(w), (0, S.notFollowedBy)(O, j)), // </Identifier>
    //  ^^^^^^^^^^^^
    (0, S.seq)((0, S.precededByToken)("BRA"), A, (0, S.optional)(w), O, (0, S.optional)(w), T), x, C, N, $, P)), D = function(e) {
        return e.replace(/^\n/, "").replace(/\n$/, "");
    };
    t._tokenize = function(e) {
        return (0, S.TokenStream)(L(e));
    }, t.extractFirst = g(function() {
        return !0;
    });
}, /* 4 */
/***/
function(e, t, n) {
    "use strict";
    function r(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n;
        }
        return Array.from(e);
    }
    // Construct a token.
    //
    // type - e.g. 'UNDERSCORE'
    // token - e.g. '_'
    // pos - the (starting) position in the string where it occurred
    // string - the full string being tokenized
    function o(e, t, n, r) {
        return {
            type: e,
            token: t,
            pos: n,
            string: r
        };
    }
    function i(e, t) {
        return {
            tokens: e,
            newCharacterStream: t
        };
    }
    // A simple "stream" wrapper around an array or string.
    //
    // Input:
    //
    //   buffer - the underlying array/string
    //   pos - the 'zero' index of the stream
    //
    // Properties:
    //
    //   length - the length of the buffer remaining from index pos
    //   present - whether the above length is not zero
    //   empty - negation of the above
    //   rest() - the buffer sliced from pos onward
    //   get() - the item in the buffer at pos
    //   advance(index = 1) - advance the stream forward by `index` characters;
    //                        returns a new Stream
    //   take(n) - return the next `n` items in the stream (or as many as are left,
    //             whichever is greater)
    //
    // The calling code can pretend they're just dealing with the slice, but we
    // keep track of where we are in the underlying list.
    function a(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
        return {
            buffer: e,
            pos: t,
            length: e.length - t,
            present: t < e.length,
            empty: t >= e.length,
            rest: function() {
                return e.slice(t);
            },
            get: function() {
                return e[t];
            },
            advance: function() {
                var n = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                return a(e, t + n);
            },
            take: function(n) {
                return e.slice(t, t + n);
            }
        };
    }
    function c(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
        return b({}, a(e, t), {
            advance: function() {
                var n = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                return c(e, t + n);
            },
            flush: function() {
                return c(e, e.length);
            },
            Token: function(n, r) {
                return o(n, r, t, e);
            }
        });
    }
    function u(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1], n = e.length > 0 ? e[0].string : "";
        return b({}, a(e, t), {
            // advance to the next token
            advance: function() {
                var n = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                return u(e, t + n);
            },
            // is the cursor at a token of type `type`?
            ofType: function(n) {
                return t < e.length && e[t].type === n;
            },
            // the original string being parsed
            string: n
        });
    }
    // Define a tokenizer matching what's left in the stream with a regex. A `^` is
    // automatically prepended to the regex, so there is no need to include it
    // yourself.
    //
    // Example:
    //
    //   const WORD = regex('WORD', /\S+\s*/);
    //   Lexer(WORD)('this is a string')
    //   // => [
    //     Token('WORD',  'this ',    0),
    //     Token('WORD',  'is ',      5),
    //     Token('WORD',  'a ',       8),
    //     Token('WORD',  'string ',  10)
    //   ]
    //  
    function l(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? "" : arguments[2], r = new RegExp(/^/.source + t.source, n);
        return function(t, n) {
            var o;
            return (o = n.rest().match(r)) ? i([ n.Token(e, o[0]) ], n.advance(o[0].length)) : null;
        };
    }
    // Like the regex matcher, but throws away the matched token.
    function f(e) {
        return function(t, n) {
            var r;
            return (r = e(t, n)) ? i([], r.newCharacterStream) : null;
        };
    }
    function s(e) {
        return function(t, n) {
            var r;
            return (r = e(t, n)) ? i([], r.newCharacterStream) : i([], n);
        };
    }
    function p(e, t) {
        return function(n, o) {
            var a = e(n, o);
            if (!a) return null;
            var c = t([].concat(r(n), r(a.tokens)), a.newCharacterStream);
            return c ? i([].concat(r(a.tokens), r(c.tokens)), c.newCharacterStream) : null;
        };
    }
    function v(e, t, n) {
        var r = p(e, t);
        if (n) {
            for (var o = arguments.length, i = Array(o > 3 ? o - 3 : 0), a = 3; a < o; a++) i[a - 3] = arguments[a];
            return v.apply(void 0, [ r, n ].concat(i));
        }
        return r;
    }
    function h(e) {
        return function(t, n) {
            var r = t[t.length - 1];
            return r && r.type == e ? i([], n) : null;
        };
    }
    function d(e, t) {
        return function(n, r) {
            var a;
            if (a = t(n, r)) {
                return i(a.tokens.map(function(t) {
                    var n = t.type, r = t.token, i = t.pos, a = t.string;
                    return o(n, e(r), i, a);
                }), a.newCharacterStream);
            }
            return null;
        };
    }
    function y() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return function(e, n) {
            for (var r, o = 0; o < t.length; o++) if (r = t[o](e, n)) return r;
            return null;
        };
    }
    function g(e) {
        return function(t, n) {
            for (var o = [], a = 0; n.present; ) {
                var c = e(o, n);
                if (!c) break;
                // Don't get caught in an infinite loop.
                if (o = [].concat(r(o), r(c.tokens)), c.newCharacterStream.pos === n.pos) return i(o, c.newCharacterStream);
                if (a++ > 1e4) throw "tried to lex more than 10,000 tokens - this is probably a bug.";
                n = c.newCharacterStream;
            }
            return i(o, n);
        };
    }
    // Concatenates the (string) tokens returned by a matcher into a single string.
    function m(e, t) {
        return function(n, r) {
            var o = t(n, r);
            if (o) {
                var a = o.tokens.map(function(e) {
                    return e.token;
                }).join("");
                return i([ r.Token(e, a) ], o.newCharacterStream);
            }
            return null;
        };
    }
    function _(e, t) {
        return function(n, o) {
            var i = e(n, o);
            return i ? t([].concat(r(n), r(i.tokens)), i.newCharacterStream) ? null : i : null;
        };
    }
    function I(e) {
        return function(t) {
            var n = c(t);
            return g(y(e, l("UNKNOWN", /[^]*/)))([], n).tokens;
        };
    }
    var b = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.CharacterStream = c, t.TokenStream = u, t.regex = l, t.skip = f, t.optional = s, 
    t.seq = v, t.precededByToken = h, t.map = d, t.or = y, t.repeat = g, t.concat = m, 
    t.notFollowedBy = _, t.Lexer = I, // Construct a response returned by a lexer.
    //
    // tokens - an array of tokens generated by the lexer; may be empty
    // newCharacterStream - a new character stream for the next lexer
    t.Token = o;
} ]);
>>>>>>> b61f4e24e4bb97491a1ec3688c057284de885754
