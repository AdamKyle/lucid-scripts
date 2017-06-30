/*:
 * @plugindesc Allows you to have stat percentage changes based on equipped items.
 * @author Eviticous
 *
 * @help
 *
 * Must give credit. Can be used in commercial Games.
 *
 * Compatibility: ???
 *
 * Place: <equip: stat: def amount: 15 action: increase> in a equipment's note tag.
 *
 * This will state that while the player is wearing this equipment they will receive
 * a increase or decrease to the stat in question.
 *
 * Can be done multiple times, to affect other stats.
 */
!function(e){function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}var t={};r.m=e,r.c=t,r.i=function(e){return e},r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=8)}([function(e,r,t){"use strict";function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}function u(e){for(var r,t,n,u={args:[]};r=i(e);){var o=r,c=T(o,2);if(t=c[0],n=c[1],"object"===(void 0===t?"undefined":a(t))){u=E({},u,t);var l=n.ofType("COMMA"),f=n.ofType("KEY")&&n.advance().ofType("KEYVALSEP");if(l)e=n.advance();else{if(!f)return[u,n];e=n}}else{if(u=E({},u,{args:u.args.concat(t)}),n.empty||"COMMA"!=n.get().type)return[u,n];e=n.advance()}}return[u,e]}function i(e){return o(e)||c(e)}function o(e){if(e.length<3)return null;if(!e.ofType("KEY")||!e.advance().ofType("KEYVALSEP"))return null;var r=c(e.advance(2));return r?[n({},e.get().token,r[0]),e.advance(3)]:null}function c(e){if(e.empty)return null;var r=e.get(),t=r.token;switch(r.type){case"NUMBER":return[Number(t),e.advance()];case"QUOTEDSTRING":return[M(t),e.advance()];case"BARESTRING":case"KEY":return[t,e.advance()];case"BOOLEAN":return["true"===t.toLowerCase(),e.advance()];default:return null}}function l(e){if(e.length<3)return null;if(!e.ofType("BRA"))return null;var r=u(e.advance());if(!r)return null;var t=T(r,2),n=t[0],a=t[1];return a.ofType("KET")?[n,a.advance()]:null}function f(e){if(e.length<3)return null;var r=e.advance();if(!e.ofType("BRA")||!r.ofType("IDENTIFIER"))return null;var t=u(e.advance(2));if(!t)return null;var n=T(t,2),a=n[0],i=n[1];if(!i.ofType("KET"))return null;var o=r.get().token,c=p(function(e){return s(["BRA","SLASH","IDENTIFIER","KET"],e)&&e.advance(2).get().token===o},i.advance());if(c){var l=i.get().string,f=l.slice(i.get().pos+1,c.get().pos);return[E({},a,{type:o,block:G(f)}),c.advance(4)]}return[E({},a,{type:o}),i.advance()]}function s(e,r){for(var t=0;t<e.length;t++)if(!r.advance(t).ofType(e[t]))return!1;return!0}function p(e,r){for(;r.present;){if(e(r))return r;r=r.advance()}return null}function d(e){return l(e)||f(e)}function v(e){var r=d(e);return r?r[0]:null}function g(e){return v((0,k.TokenStream)(D(e)))}function h(e){for(var r=(0,k.TokenStream)(D(e)),t=[];r.present;){var n=d(r);n?(t.push(n[0]),r=n[1]):r=r.advance()}return t}function m(e){return function(r){for(var t=(0,k.TokenStream)(D(r));t.present;){var n=d(t);if(n&&e(n[0]))return n[0];t=t.advance()}return null}}function y(e,r){return m(function(e){return e.type===r})(e)}function S(e,r){return h(e).filter(function(e){return e.type===r})}var E=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},T=function(){function e(e,r){var t=[],n=!0,a=!1,u=void 0;try{for(var i,o=e[Symbol.iterator]();!(n=(i=o.next()).done)&&(t.push(i.value),!r||t.length!==r);n=!0);}catch(e){a=!0,u=e}finally{try{!n&&o.return&&o.return()}finally{if(a)throw u}}return t}return function(r,t){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return e(r,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();Object.defineProperty(r,"__esModule",{value:!0}),r.extractFirst=r._tokenize=void 0,r.parse=g,r.extractAll=h,r.extractFirstOfType=y,r.extractAllOfType=S;var k=t(1),b=(0,k.regex)("BRA",/</),A=(0,k.regex)("KET",/>/),w=(0,k.skip)((0,k.regex)("WHITESPACE",/\s+/)),I=(0,k.regex)("IDENTIFIER",/[a-zA-Z_][a-zA-Z0-9-_]*/),q=(0,k.regex)("KEY",/[a-zA-Z_][a-zA-Z0-9-_]*/),_=(0,k.regex)("KEYVALSEP",/:/),x=((0,k.seq)(q,(0,k.optional)(w),_),(0,k.regex)("SLASH",/\//)),C=(0,k.regex)("SIGNIFICANT_WHITESPACE",/\s+/),O=(0,k.regex)("BAREWORD",/[^,:><"\s]+/),B=(0,k.concat)("BARESTRING",(0,k.seq)(O,(0,k.repeat)((0,k.notFollowedBy)((0,k.seq)(C,O),(0,k.seq)((0,k.optional)(w),_))))),M=function(e){return JSON.parse(e.replace(/\n/g,"\\n"))},P=(0,k.regex)("COMMA",/,/),N=(0,k.regex)("NUMBER",/-?[0-9]+(\.[0-9]+)?/),R=(0,k.regex)("BOOLEAN",/(true|false)/,"i"),j=(0,k.regex)("QUOTEDSTRING",/"(\\.|[^"\\])*"/),D=(0,k.Lexer)((0,k.or)(w,b,A,P,(0,k.seq)(q,(0,k.optional)(w),_),(0,k.seq)((0,k.precededByToken)("BRA"),(0,k.optional)(w),(0,k.notFollowedBy)(I,P)),(0,k.seq)((0,k.precededByToken)("BRA"),x,(0,k.optional)(w),I,(0,k.optional)(w),A),_,N,R,j,B)),G=function(e){return e.replace(/^\n/,"").replace(/\n$/,"")};r._tokenize=function(e){return(0,k.TokenStream)(D(e))},r.extractFirst=m(function(){return!0})},function(e,r,t){"use strict";function n(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}function a(e,r,t,n){return{type:e,token:r,pos:t,string:n}}function u(e,r){return{tokens:e,newCharacterStream:r}}function i(e){var r=arguments.length<=1||void 0===arguments[1]?0:arguments[1];return{buffer:e,pos:r,length:e.length-r,present:r<e.length,empty:r>=e.length,rest:function(){return e.slice(r)},get:function(){return e[r]},advance:function(){var t=arguments.length<=0||void 0===arguments[0]?1:arguments[0];return i(e,r+t)},take:function(t){return e.slice(r,r+t)}}}function o(e){var r=arguments.length<=1||void 0===arguments[1]?0:arguments[1];return T({},i(e,r),{advance:function(){var t=arguments.length<=0||void 0===arguments[0]?1:arguments[0];return o(e,r+t)},flush:function(){return o(e,e.length)},Token:function(t,n){return a(t,n,r,e)}})}function c(e){var r=arguments.length<=1||void 0===arguments[1]?0:arguments[1],t=e.length>0?e[0].string:"";return T({},i(e,r),{advance:function(){var t=arguments.length<=0||void 0===arguments[0]?1:arguments[0];return c(e,r+t)},ofType:function(t){return r<e.length&&e[r].type===t},string:t})}function l(e,r){var t=arguments.length<=2||void 0===arguments[2]?"":arguments[2],n=new RegExp(/^/.source+r.source,t);return function(r,t){var a;return(a=t.rest().match(n))?u([t.Token(e,a[0])],t.advance(a[0].length)):null}}function f(e){return function(r,t){var n;return(n=e(r,t))?u([],n.newCharacterStream):null}}function s(e){return function(r,t){var n;return(n=e(r,t))?u([],n.newCharacterStream):u([],t)}}function p(e,r){return function(t,a){var i=e(t,a);if(!i)return null;var o=r([].concat(n(t),n(i.tokens)),i.newCharacterStream);return o?u([].concat(n(i.tokens),n(o.tokens)),o.newCharacterStream):null}}function d(e,r,t){var n=p(e,r);if(t){for(var a=arguments.length,u=Array(a>3?a-3:0),i=3;i<a;i++)u[i-3]=arguments[i];return d.apply(void 0,[n,t].concat(u))}return n}function v(e){return function(r,t){var n=r[r.length-1];return n&&n.type==e?u([],t):null}}function g(e,r){return function(t,n){var i;if(i=r(t,n)){return u(i.tokens.map(function(r){var t=r.type,n=r.token,u=r.pos,i=r.string;return a(t,e(n),u,i)}),i.newCharacterStream)}return null}}function h(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return function(e,t){for(var n,a=0;a<r.length;a++)if(n=r[a](e,t))return n;return null}}function m(e){return function(r,t){for(var a=[],i=0;t.present;){var o=e(a,t);if(!o)break;if(a=[].concat(n(a),n(o.tokens)),o.newCharacterStream.pos===t.pos)return u(a,o.newCharacterStream);if(i++>1e4)throw"tried to lex more than 10,000 tokens - this is probably a bug.";t=o.newCharacterStream}return u(a,t)}}function y(e,r){return function(t,n){var a=r(t,n);if(a){var i=a.tokens.map(function(e){return e.token}).join("");return u([n.Token(e,i)],a.newCharacterStream)}return null}}function S(e,r){return function(t,a){var u=e(t,a);return u?r([].concat(n(t),n(u.tokens)),u.newCharacterStream)?null:u:null}}function E(e){return function(r){var t=o(r);return m(h(e,l("UNKNOWN",/[^]*/)))([],t).tokens}}var T=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e};Object.defineProperty(r,"__esModule",{value:!0}),r.CharacterStream=o,r.TokenStream=c,r.regex=l,r.skip=f,r.optional=s,r.seq=d,r.precededByToken=v,r.map=g,r.or=h,r.repeat=m,r.concat=y,r.notFollowedBy=S,r.Lexer=E,r.Token=a},function(e,r){e.exports.getParamId=function(e){switch(e){case"mhp":return 0;case"mmp":return 1;case"atk":return 2;case"def":return 3;case"mat":return 4;case"mdf":return 5;case"agi":return 6;case"luk":return 7;default:throw Error("Unknown param: "+e)}}},,function(e,r,t){function n(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),u=t(0).extractAll,i=t(2).getParamId;e.exports=function(){function e(){n(this,e)}return a(e,[{key:"getTags",value:function(e){if(null!==e){var r=u(e.note),t=[];return!r.length>0?null:(r.forEach(function(e){t.push({stat:e.stat,amount:e.amount,action:e.action})}),t)}}},{key:"applyStatChanges",value:function(e,r){var t=0;e.forEach(function(e){var n=i(e.stat);if("increase"===e.action)t=r.param(n)*(1+e.amount/100),r.addParam(n,Math.round(t-r.param(n)));else{if("decrease"!==e.action)throw Error("type for the tag param must be increase or decrease.");t=r.param(n)*(1-e.amount/100),r.subtractParam(n,Math.round(t-r.param(n)))}})}},{key:"removeStateChanges",value:function(e,r){if(null!==e){var t=0;e.forEach(function(e){var n=i(e.stat);if("increase"===e.action)t=r.param(n)/(1+e.amount/100),r.subtractParam(n,Math.round(t-r.param(n)));else{if("decrease"!==e.action)throw Error("type for the tag param must be increase or decrease.");t=r.param(n)/(1-e.amount/100),r.addParam(n,Math.round(t-r.param(n)))}})}}}]),e}()},,,,function(e,r,t){var n=t(4);window.lucidScripts=window.lucidScripts||{},lucidScripts.lucidEquiped={},Game_BattlerBase.prototype.subtractParam=function(e,r){this._paramPlus[e]+=r,this.refresh()};var a=Game_Actor.prototype.forceChangeEquip;Game_Actor.prototype.forceChangeEquip=function(e,r){o(r,e,this),a.call(this,e,r)};var u=Game_Actor.prototype.changeEquip;Game_Actor.prototype.changeEquip=function(e,r){u.call(this,e,r),o(r,e,this)};var i=DataManager.setupNewGame;DataManager.setupNewGame=function(){i.call(this),d(!0)};var o=function(e,r,t){var a=new n,u=a.getTags(e);if(null!==e)if(l(t),0===lucidScripts.lucidEquiped[t._actorId].length)lucidScripts.lucidEquiped[t._actorId].push({item:e,slotId:r}),null!==u&&a.applyStatChanges(u,t);else{var i=p(r,t._actorId);-1!==i?c(t,i,e,a):(lucidScripts.lucidEquiped[t._actorId].push({item:e,slotId:r}),null!==u&&a.applyStatChanges(u,t))}else{if(0===Object.keys(lucidScripts.lucidEquiped).length)return;if(void 0===lucidScripts.lucidEquiped[t._actorId])return;var o=p(r,t._actorId);if(-1===o)return;var f=lucidScripts.lucidEquiped[t._actorId][o].item,s=a.getTags(f);null!==s&&a.removeStateChanges(s,t),lucidScripts.lucidEquiped[t._actorId]=[],d()}},c=function(e,r,t,n){var a=lucidScripts.lucidEquiped[e._actorId][r].item,u=n.getTags(a);null!==u&&n.removeStateChanges(u,e),lucidScripts.lucidEquiped[e._actorId][r].item=t,null!==u&&n.applyStatChanges(tagObject,e)},l=function(e){0===Object.keys(lucidScripts.lucidEquiped).length?lucidScripts.lucidEquiped[e._actorId]=[]:void 0===lucidScripts.lucidEquiped[this._actorId]&&(lucidScripts.lucidEquiped[e._actorId]=[])},f=DataManager.makeSaveContents;DataManager.makeSaveContents=function(){var e=f.call(this);return e.lucidScripts=e.lucidScripts||{},e.lucidScripts.lucidEquiped=lucidScripts.lucidEquiped,e};var s=DataManager.extractSaveContents;DataManager.extractSaveContents=function(e){s.call(this,e),lucidScripts.lucidEquiped=e.lucidScripts.lucidEquiped};var p=function(e,r){for(var t=0;t<lucidScripts.lucidEquiped[r].length;t++){if(void 0===lucidScripts.lucidEquiped[r][t])return-1;if(lucidScripts.lucidEquiped[r][t].slotId===e)return t}return-1},d=function(e){var r=new n,t=e||!1;$gameActors._data.forEach(function(e){for(var n=0;n<e._equips.length;n++)if(l(e),0!==e._equips[n]._itemId){var a=e.equips()[n],u=r.getTags(a);lucidScripts.lucidEquiped[e._actorId].push({item:a,slotId:n}),null!==u&&t&&r.applyStatChanges(u,e)}})}}]);