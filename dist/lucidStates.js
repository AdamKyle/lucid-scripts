/*:
 * @plugindesc Allow states to directly affect certian stats
 *
 * @author Adam Balan
 *
 * @help
 *
 * Place <state stat: 'def' amount: x%, action: 'increase/decrease'>
 *
 * stat: which stat should we increase?
 * amount: the percentage in a decimal form, eg: 0.01 is 1%
 * action: increase or decrease by the amount set.
 */

!function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var r={};t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=7)}([function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}function o(e){for(var t,r,n,o={args:[]};t=u(e);){var c=t,i=T(c,2);if(r=i[0],n=i[1],"object"===(void 0===r?"undefined":a(r))){o=A({},o,r);var f=n.ofType("COMMA"),s=n.ofType("KEY")&&n.advance().ofType("KEYVALSEP");if(f)e=n.advance();else{if(!s)return[o,n];e=n}}else{if(o=A({},o,{args:o.args.concat(r)}),n.empty||"COMMA"!=n.get().type)return[o,n];e=n.advance()}}return[o,e]}function u(e){return c(e)||i(e)}function c(e){if(e.length<3)return null;if(!e.ofType("KEY")||!e.advance().ofType("KEYVALSEP"))return null;var t=i(e.advance(2));return t?[n({},e.get().token,t[0]),e.advance(3)]:null}function i(e){if(e.empty)return null;var t=e.get(),r=t.token;switch(t.type){case"NUMBER":return[Number(r),e.advance()];case"QUOTEDSTRING":return[R(r),e.advance()];case"BARESTRING":case"KEY":return[r,e.advance()];case"BOOLEAN":return["true"===r.toLowerCase(),e.advance()];default:return null}}function f(e){if(e.length<3)return null;if(!e.ofType("BRA"))return null;var t=o(e.advance());if(!t)return null;var r=T(t,2),n=r[0],a=r[1];return a.ofType("KET")?[n,a.advance()]:null}function s(e){if(e.length<3)return null;var t=e.advance();if(!e.ofType("BRA")||!t.ofType("IDENTIFIER"))return null;var r=o(e.advance(2));if(!r)return null;var n=T(r,2),a=n[0],u=n[1];if(!u.ofType("KET"))return null;var c=t.get().token,i=p(function(e){return l(["BRA","SLASH","IDENTIFIER","KET"],e)&&e.advance(2).get().token===c},u.advance());if(i){var f=u.get().string,s=f.slice(u.get().pos+1,i.get().pos);return[A({},a,{type:c,block:L(s)}),i.advance(4)]}return[A({},a,{type:c}),u.advance()]}function l(e,t){for(var r=0;r<e.length;r++)if(!t.advance(r).ofType(e[r]))return!1;return!0}function p(e,t){for(;t.present;){if(e(t))return t;t=t.advance()}return null}function v(e){return f(e)||s(e)}function d(e){var t=v(e);return t?t[0]:null}function h(e){return d((0,b.TokenStream)(F(e)))}function y(e){for(var t=(0,b.TokenStream)(F(e)),r=[];t.present;){var n=v(t);n?(r.push(n[0]),t=n[1]):t=t.advance()}return r}function g(e){return function(t){for(var r=(0,b.TokenStream)(F(t));r.present;){var n=v(r);if(n&&e(n[0]))return n[0];r=r.advance()}return null}}function m(e,t){return g(function(e){return e.type===t})(e)}function S(e,t){return y(e).filter(function(e){return e.type===t})}var A=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},T=function(){function e(e,t){var r=[],n=!0,a=!1,o=void 0;try{for(var u,c=e[Symbol.iterator]();!(n=(u=c.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{!n&&c.return&&c.return()}finally{if(a)throw o}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();Object.defineProperty(t,"__esModule",{value:!0}),t.extractFirst=t._tokenize=void 0,t.parse=h,t.extractAll=y,t.extractFirstOfType=m,t.extractAllOfType=S;var b=r(1),k=(0,b.regex)("BRA",/</),E=(0,b.regex)("KET",/>/),w=(0,b.skip)((0,b.regex)("WHITESPACE",/\s+/)),x=(0,b.regex)("IDENTIFIER",/[a-zA-Z_][a-zA-Z0-9-_]*/),O=(0,b.regex)("KEY",/[a-zA-Z_][a-zA-Z0-9-_]*/),I=(0,b.regex)("KEYVALSEP",/:/),C=((0,b.seq)(O,(0,b.optional)(w),I),(0,b.regex)("SLASH",/\//)),B=(0,b.regex)("SIGNIFICANT_WHITESPACE",/\s+/),N=(0,b.regex)("BAREWORD",/[^,:><"\s]+/),P=(0,b.concat)("BARESTRING",(0,b.seq)(N,(0,b.repeat)((0,b.notFollowedBy)((0,b.seq)(B,N),(0,b.seq)((0,b.optional)(w),I))))),R=function(e){return JSON.parse(e.replace(/\n/g,"\\n"))},_=(0,b.regex)("COMMA",/,/),j=(0,b.regex)("NUMBER",/-?[0-9]+(\.[0-9]+)?/),M=(0,b.regex)("BOOLEAN",/(true|false)/,"i"),K=(0,b.regex)("QUOTEDSTRING",/"(\\.|[^"\\])*"/),F=(0,b.Lexer)((0,b.or)(w,k,E,_,(0,b.seq)(O,(0,b.optional)(w),I),(0,b.seq)((0,b.precededByToken)("BRA"),(0,b.optional)(w),(0,b.notFollowedBy)(x,_)),(0,b.seq)((0,b.precededByToken)("BRA"),C,(0,b.optional)(w),x,(0,b.optional)(w),E),I,j,M,K,P)),L=function(e){return e.replace(/^\n/,"").replace(/\n$/,"")};t._tokenize=function(e){return(0,b.TokenStream)(F(e))},t.extractFirst=g(function(){return!0})},function(e,t,r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function a(e,t,r,n){return{type:e,token:t,pos:r,string:n}}function o(e,t){return{tokens:e,newCharacterStream:t}}function u(e){var t=arguments.length<=1||void 0===arguments[1]?0:arguments[1];return{buffer:e,pos:t,length:e.length-t,present:t<e.length,empty:t>=e.length,rest:function(){return e.slice(t)},get:function(){return e[t]},advance:function(){var r=arguments.length<=0||void 0===arguments[0]?1:arguments[0];return u(e,t+r)},take:function(r){return e.slice(t,t+r)}}}function c(e){var t=arguments.length<=1||void 0===arguments[1]?0:arguments[1];return T({},u(e,t),{advance:function(){var r=arguments.length<=0||void 0===arguments[0]?1:arguments[0];return c(e,t+r)},flush:function(){return c(e,e.length)},Token:function(r,n){return a(r,n,t,e)}})}function i(e){var t=arguments.length<=1||void 0===arguments[1]?0:arguments[1],r=e.length>0?e[0].string:"";return T({},u(e,t),{advance:function(){var r=arguments.length<=0||void 0===arguments[0]?1:arguments[0];return i(e,t+r)},ofType:function(r){return t<e.length&&e[t].type===r},string:r})}function f(e,t){var r=arguments.length<=2||void 0===arguments[2]?"":arguments[2],n=new RegExp(/^/.source+t.source,r);return function(t,r){var a;return(a=r.rest().match(n))?o([r.Token(e,a[0])],r.advance(a[0].length)):null}}function s(e){return function(t,r){var n;return(n=e(t,r))?o([],n.newCharacterStream):null}}function l(e){return function(t,r){var n;return(n=e(t,r))?o([],n.newCharacterStream):o([],r)}}function p(e,t){return function(r,a){var u=e(r,a);if(!u)return null;var c=t([].concat(n(r),n(u.tokens)),u.newCharacterStream);return c?o([].concat(n(u.tokens),n(c.tokens)),c.newCharacterStream):null}}function v(e,t,r){var n=p(e,t);if(r){for(var a=arguments.length,o=Array(a>3?a-3:0),u=3;u<a;u++)o[u-3]=arguments[u];return v.apply(void 0,[n,r].concat(o))}return n}function d(e){return function(t,r){var n=t[t.length-1];return n&&n.type==e?o([],r):null}}function h(e,t){return function(r,n){var u;if(u=t(r,n)){return o(u.tokens.map(function(t){var r=t.type,n=t.token,o=t.pos,u=t.string;return a(r,e(n),o,u)}),u.newCharacterStream)}return null}}function y(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e,r){for(var n,a=0;a<t.length;a++)if(n=t[a](e,r))return n;return null}}function g(e){return function(t,r){for(var a=[],u=0;r.present;){var c=e(a,r);if(!c)break;if(a=[].concat(n(a),n(c.tokens)),c.newCharacterStream.pos===r.pos)return o(a,c.newCharacterStream);if(u++>1e4)throw"tried to lex more than 10,000 tokens - this is probably a bug.";r=c.newCharacterStream}return o(a,r)}}function m(e,t){return function(r,n){var a=t(r,n);if(a){var u=a.tokens.map(function(e){return e.token}).join("");return o([n.Token(e,u)],a.newCharacterStream)}return null}}function S(e,t){return function(r,a){var o=e(r,a);return o?t([].concat(n(r),n(o.tokens)),o.newCharacterStream)?null:o:null}}function A(e){return function(t){var r=c(t);return g(y(e,f("UNKNOWN",/[^]*/)))([],r).tokens}}var T=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};Object.defineProperty(t,"__esModule",{value:!0}),t.CharacterStream=c,t.TokenStream=i,t.regex=f,t.skip=s,t.optional=l,t.seq=v,t.precededByToken=d,t.map=h,t.or=y,t.repeat=g,t.concat=m,t.notFollowedBy=S,t.Lexer=A,t.Token=a},,,function(e,t,r){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(0).extractAll,u=r(6).getParamId;e.exports=function(){function e(){n(this,e)}return a(e,[{key:"getStateNoteObjects",value:function(e){var t=o(e.note),r=[];return!t.length>0?null:(t.forEach(function(e){r.push({stat:e.stat,amount:e.amount,action:e.action})}),r)}},{key:"applyStatChanges",value:function(e,t){e.forEach(function(e){var r=u(e.stat),n=0;if("increase"===e.action)n=t.param(r)*(1+e.amount/100),t.addParam(r,Math.round(n-t.param(r)));else{if("decrease"!==e.action)throw Error("type for the tag param must be increase or decrease.");n=t.param(r)*(1-e.amount/100),t.subtractParam(r,Math.round(n-t.param(r)))}})}},{key:"removeStateChanges",value:function(e,t){var r=0;e.forEach(function(e){var n=u(e.stat);if("increase"===e.action)r=t.param(n)/(1+e.amount/100),t.subtractParam(n,Math.round(r-t.param(n)));else{if("decrease"!==e.action)throw Error("type for the tag param must be increase or decrease.");r=t.param(n)/(1-e.amount/100),t.addParam(n,Math.round(r-t.param(n)))}})}}]),e}()},,function(e,t){e.exports.getParamId=function(e){switch(e){case"mhp":return 0;case"mmp":return 1;case"atk":return 2;case"def":return 3;case"mat":return 4;case"mdf":return 5;case"agi":return 6;case"luk":return 7;default:throw Error("Unknown param.")}}},function(e,t,r){var n=r(4);window.lucidScripts=window.lucidScripts||{},lucidScripts.lucidStates=[],Game_Battler.prototype.addState=function(e){this.isStateAddable(e)&&(state=new n,stateInfoArray=state.getStateNoteObjects($dataStates[e]),this.isStateAffected(e)||(this.addNewState(e),this.refresh()),this.resetStateCounts(e),this._result.pushAddedState(e),null!==stateInfoArray&&state.applyStatChanges(stateInfoArray,this))},Game_Battler.prototype.removeState=function(e){this.isStateAffected(e)&&(state=new n,stateInfoArray=state.getStateNoteObjects($dataStates[e]),e===this.deathStateId()&&this.revive(),this.eraseState(e),null!==stateInfoArray&&state.removeStateChanges(stateInfoArray,this),this.refresh(),this._result.pushRemovedState(e))},Game_BattlerBase.prototype.subtractParam=function(e,t){this._paramPlus[e]+=t,this.refresh()}}]);
