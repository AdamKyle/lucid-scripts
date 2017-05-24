/******/ !function(e) {
    /******/
    /******/
    // The require function
    /******/
    function t(n) {
        /******/
        /******/
        // Check if module is in cache
        /******/
        if (r[n]) /******/
        return r[n].exports;
        /******/
        // Create a new module (and put it into the cache)
        /******/
        var a = r[n] = {
            /******/
            i: n,
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
        return e[n].call(a.exports, a, a.exports, t), a.l = !0, a.exports;
    }
    // webpackBootstrap
    /******/
    // The module cache
    /******/
    var r = {};
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
    t.c = r, /******/
    /******/
    // identity function for calling harmony imports with the correct context
    /******/
    t.i = function(e) {
        return e;
    }, /******/
    /******/
    // define getter function for harmony exports
    /******/
    t.d = function(e, r, n) {
        /******/
        t.o(e, r) || /******/
        Object.defineProperty(e, r, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: n
        });
    }, /******/
    /******/
    // getDefaultExport function for compatibility with non-harmony modules
    /******/
    t.n = function(e) {
        /******/
        var r = e && e.__esModule ? /******/
        function() {
            return e.default;
        } : /******/
        function() {
            return e;
        };
        /******/
        /******/
        return t.d(r, "a", r), r;
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
    t.p = "", t(t.s = 7);
}([ /* 0 */
/***/
function(e, t, r) {
    "use strict";
    function n(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e;
    }
    function a(e) {
        return e && "undefined" != typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
    }
    /*

Grammar:

OPTS = < ARGS > | < IDENT : ARGS >
ARGS = ARG | ARGS , ARG
ARG = KEY : VAL | VAL

*/
    // Parses a list of arguments.
    function o(e) {
        for (var t, r, n, o = {
            args: []
        }; t = u(e); ) {
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
            var c = t, i = T(c, 2);
            if (r = i[0], n = i[1], "object" === (void 0 === r ? "undefined" : a(r))) {
                o = A({}, o, r);
                var f = n.ofType("COMMA"), s = n.ofType("KEY") && n.advance().ofType("KEYVALSEP");
                if (f) e = n.advance(); else {
                    if (!s) return [ o, n ];
                    e = n;
                }
            } else {
                if (o = A({}, o, {
                    args: o.args.concat(r)
                }), n.empty || "COMMA" != n.get().type) return [ o, n ];
                e = n.advance();
            }
        }
        return [ o, e ];
    }
    // Parses an argument - either a key-value pair or a positional argument.
    function u(e) {
        return c(e) || i(e);
    }
    // Parses a key-value pair.
    function c(e) {
        if (e.length < 3) return null;
        if (!e.ofType("KEY") || !e.advance().ofType("KEYVALSEP")) return null;
        var t = i(e.advance(2));
        return t ? [ n({}, e.get().token, t[0]), e.advance(3) ] : null;
    }
    // Parses the value from a key-value pair, or a bare value as a positional
    // argument.
    function i(e) {
        if (e.empty) return null;
        var t = e.get(), r = t.token;
        switch (t.type) {
          case "NUMBER":
            return [ Number(r), e.advance() ];

          case "QUOTEDSTRING":
            return [ R(r), e.advance() ];

          case "BARESTRING":
          case "KEY":
            return [ r, e.advance() ];

          case "BOOLEAN":
            return [ "true" === r.toLowerCase(), e.advance() ];

          default:
            return null;
        }
    }
    // Parses an "anonymous" object, that is one without a name.
    //
    // Example:
    //
    //   <foo: 123, bar: "baz">
    function f(e) {
        if (e.length < 3) return null;
        if (!e.ofType("BRA")) return null;
        var t = o(e.advance());
        if (!t) return null;
        var r = T(t, 2), n = r[0], a = r[1];
        return a.ofType("KET") ? [ n, a.advance() ] : null;
    }
    // Parses a "named" object.
    //
    // Example:
    //
    //   <Currency name: "Foo">
    function s(e) {
        if (e.length < 3) return null;
        var t = e.advance();
        if (!e.ofType("BRA") || !t.ofType("IDENTIFIER")) return null;
        var r = o(e.advance(2));
        if (!r) return null;
        var n = T(r, 2), a = n[0], u = n[1];
        if (!u.ofType("KET")) return null;
        // e.g. Currency
        var c = t.get().token, i = p(function(e) {
            return l([ "BRA", "SLASH", "IDENTIFIER", "KET" ], e) && e.advance(2).get().token === c;
        }, u.advance());
        if (i) {
            var f = u.get().string, s = f.slice(u.get().pos + 1, i.get().pos);
            return [ A({}, a, {
                type: c,
                block: L(s)
            }), i.advance(4) ];
        }
        return [ A({}, a, {
            type: c
        }), u.advance() ];
    }
    // true if the stream is pointing at the given sequence of token names
    function l(e, t) {
        for (var r = 0; r < e.length; r++) if (!t.advance(r).ofType(e[r])) return !1;
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
        return f(e) || s(e);
    }
    function d(e) {
        var t = v(e);
        return t ? t[0] : null;
    }
    function h(e) {
        return d((0, b.TokenStream)(F(e)));
    }
    // Extract all tags contained inside a possibly-unrelated string of text.
    function y(e) {
        for (var t = (0, b.TokenStream)(F(e)), r = []; t.present; ) {
            var n = v(t);
            n ? (r.push(n[0]), t = n[1]) : t = t.advance();
        }
        return r;
    }
    function g(e) {
        return function(t) {
            for (var r = (0, b.TokenStream)(F(t)); r.present; ) {
                var n = v(r);
                if (n && e(n[0])) return n[0];
                r = r.advance();
            }
            return null;
        };
    }
    function m(e, t) {
        return g(function(e) {
            return e.type === t;
        })(e);
    }
    function S(e, t) {
        return y(e).filter(function(e) {
            return e.type === t;
        });
    }
    var A = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
    }, T = function() {
        function e(e, t) {
            var r = [], n = !0, a = !1, o = void 0;
            try {
                for (var u, c = e[Symbol.iterator](); !(n = (u = c.next()).done) && (r.push(u.value), 
                !t || r.length !== t); n = !0) ;
            } catch (e) {
                a = !0, o = e;
            } finally {
                try {
                    !n && c.return && c.return();
                } finally {
                    if (a) throw o;
                }
            }
            return r;
        }
        return function(t, r) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, r);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
    }();
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.extractFirst = t._tokenize = void 0, t.parse = h, t.extractAll = y, t.extractFirstOfType = m, 
    t.extractAllOfType = S;
    var b = r(1), k = (0, b.regex)("BRA", /</), E = (0, b.regex)("KET", />/), w = (0, 
    b.skip)((0, b.regex)("WHITESPACE", /\s+/)), x = (0, b.regex)("IDENTIFIER", /[a-zA-Z_][a-zA-Z0-9-_]*/), O = (0, 
    b.regex)("KEY", /[a-zA-Z_][a-zA-Z0-9-_]*/), I = (0, b.regex)("KEYVALSEP", /:/), C = ((0, 
    b.seq)(O, (0, b.optional)(w), I), (0, b.regex)("SLASH", /\//)), B = (0, b.regex)("SIGNIFICANT_WHITESPACE", /\s+/), N = (0, 
    b.regex)("BAREWORD", /[^,:><"\s]+/), P = (0, b.concat)("BARESTRING", (0, b.seq)(N, (0, 
    b.repeat)((0, b.notFollowedBy)((0, b.seq)(B, N), (0, b.seq)((0, b.optional)(w), I))))), R = function(e) {
        return JSON.parse(e.replace(/\n/g, "\\n"));
    }, _ = (0, b.regex)("COMMA", /,/), j = (0, b.regex)("NUMBER", /-?[0-9]+(\.[0-9]+)?/), M = (0, 
    b.regex)("BOOLEAN", /(true|false)/, "i"), K = (0, b.regex)("QUOTEDSTRING", /"(\\.|[^"\\])*"/), F = (0, 
    b.Lexer)((0, b.or)(w, // <key: "val">
    // ^
    k, // <key: "val">
    //            ^
    E, // <one: 1, two: 2>
    //        ^
    _, // <key: "val">
    //  ^^^^
    (0, b.seq)(O, (0, b.optional)(w), I), // <Identifier key: "val">
    //  ^^^^^^^^^^
    (0, b.seq)((0, b.precededByToken)("BRA"), (0, b.optional)(w), (0, b.notFollowedBy)(x, _)), // </Identifier>
    //  ^^^^^^^^^^^^
    (0, b.seq)((0, b.precededByToken)("BRA"), C, (0, b.optional)(w), x, (0, b.optional)(w), E), I, j, M, K, P)), L = function(e) {
        return e.replace(/^\n/, "").replace(/\n$/, "");
    };
    t._tokenize = function(e) {
        return (0, b.TokenStream)(F(e));
    }, t.extractFirst = g(function() {
        return !0;
    });
}, /* 1 */
/***/
function(e, t, r) {
    "use strict";
    function n(e) {
        if (Array.isArray(e)) {
            for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
            return r;
        }
        return Array.from(e);
    }
    // Construct a token.
    //
    // type - e.g. 'UNDERSCORE'
    // token - e.g. '_'
    // pos - the (starting) position in the string where it occurred
    // string - the full string being tokenized
    function a(e, t, r, n) {
        return {
            type: e,
            token: t,
            pos: r,
            string: n
        };
    }
    function o(e, t) {
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
    function u(e) {
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
                var r = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                return u(e, t + r);
            },
            take: function(r) {
                return e.slice(t, t + r);
            }
        };
    }
    function c(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
        return T({}, u(e, t), {
            advance: function() {
                var r = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                return c(e, t + r);
            },
            flush: function() {
                return c(e, e.length);
            },
            Token: function(r, n) {
                return a(r, n, t, e);
            }
        });
    }
    function i(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1], r = e.length > 0 ? e[0].string : "";
        return T({}, u(e, t), {
            // advance to the next token
            advance: function() {
                var r = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                return i(e, t + r);
            },
            // is the cursor at a token of type `type`?
            ofType: function(r) {
                return t < e.length && e[t].type === r;
            },
            // the original string being parsed
            string: r
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
    function f(e, t) {
        var r = arguments.length <= 2 || void 0 === arguments[2] ? "" : arguments[2], n = new RegExp(/^/.source + t.source, r);
        return function(t, r) {
            var a;
            return (a = r.rest().match(n)) ? o([ r.Token(e, a[0]) ], r.advance(a[0].length)) : null;
        };
    }
    // Like the regex matcher, but throws away the matched token.
    function s(e) {
        return function(t, r) {
            var n;
            return (n = e(t, r)) ? o([], n.newCharacterStream) : null;
        };
    }
    function l(e) {
        return function(t, r) {
            var n;
            return (n = e(t, r)) ? o([], n.newCharacterStream) : o([], r);
        };
    }
    function p(e, t) {
        return function(r, a) {
            var u = e(r, a);
            if (!u) return null;
            var c = t([].concat(n(r), n(u.tokens)), u.newCharacterStream);
            return c ? o([].concat(n(u.tokens), n(c.tokens)), c.newCharacterStream) : null;
        };
    }
    function v(e, t, r) {
        var n = p(e, t);
        if (r) {
            for (var a = arguments.length, o = Array(a > 3 ? a - 3 : 0), u = 3; u < a; u++) o[u - 3] = arguments[u];
            return v.apply(void 0, [ n, r ].concat(o));
        }
        return n;
    }
    function d(e) {
        return function(t, r) {
            var n = t[t.length - 1];
            return n && n.type == e ? o([], r) : null;
        };
    }
    function h(e, t) {
        return function(r, n) {
            var u;
            if (u = t(r, n)) {
                return o(u.tokens.map(function(t) {
                    var r = t.type, n = t.token, o = t.pos, u = t.string;
                    return a(r, e(n), o, u);
                }), u.newCharacterStream);
            }
            return null;
        };
    }
    function y() {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return function(e, r) {
            for (var n, a = 0; a < t.length; a++) if (n = t[a](e, r)) return n;
            return null;
        };
    }
    function g(e) {
        return function(t, r) {
            for (var a = [], u = 0; r.present; ) {
                var c = e(a, r);
                if (!c) break;
                // Don't get caught in an infinite loop.
                if (a = [].concat(n(a), n(c.tokens)), c.newCharacterStream.pos === r.pos) return o(a, c.newCharacterStream);
                if (u++ > 1e4) throw "tried to lex more than 10,000 tokens - this is probably a bug.";
                r = c.newCharacterStream;
            }
            return o(a, r);
        };
    }
    // Concatenates the (string) tokens returned by a matcher into a single string.
    function m(e, t) {
        return function(r, n) {
            var a = t(r, n);
            if (a) {
                var u = a.tokens.map(function(e) {
                    return e.token;
                }).join("");
                return o([ n.Token(e, u) ], a.newCharacterStream);
            }
            return null;
        };
    }
    function S(e, t) {
        return function(r, a) {
            var o = e(r, a);
            return o ? t([].concat(n(r), n(o.tokens)), o.newCharacterStream) ? null : o : null;
        };
    }
    function A(e) {
        return function(t) {
            var r = c(t);
            return g(y(e, f("UNKNOWN", /[^]*/)))([], r).tokens;
        };
    }
    var T = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.CharacterStream = c, t.TokenStream = i, t.regex = f, t.skip = s, t.optional = l, 
    t.seq = v, t.precededByToken = d, t.map = h, t.or = y, t.repeat = g, t.concat = m, 
    t.notFollowedBy = S, t.Lexer = A, // Construct a response returned by a lexer.
    //
    // tokens - an array of tokens generated by the lexer; may be empty
    // newCharacterStream - a new character stream for the next lexer
    t.Token = a;
}, /* 2 */
, /* 3 */
, /* 4 */
/***/
function(e, t, r) {
    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }
    var a = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                Object.defineProperty(e, n.key, n);
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
        };
    }(), o = r(0).extractAll, u = r(6).getParamId;
    e.exports = function() {
        function e() {
            n(this, e);
        }
        return a(e, [ {
            key: "getStateNoteObjects",
            value: function(e) {
                var t = o(e.note), r = [];
                return !t.length > 0 ? null : (t.forEach(function(e) {
                    r.push({
                        stat: e.stat,
                        amount: e.amount,
                        action: e.action
                    });
                }), r);
            }
        }, {
            key: "applyStatChanges",
            value: function(e, t) {
                e.forEach(function(e) {
                    var r = u(e.stat), n = 0;
                    if ("increase" === e.action) n = t.param(r) * (1 + e.amount / 100), t.addParam(r, Math.round(n - t.param(r))); else {
                        if ("decrease" !== e.action) throw Error("type for the tag param must be increase or decrease.");
                        n = t.param(r) * (1 - e.amount / 100), t.subtractParam(r, Math.round(n - t.param(r)));
                    }
                });
            }
        }, {
            key: "removeStateChanges",
            value: function(e, t) {
                var r = 0;
                e.forEach(function(e) {
                    var n = u(e.stat);
                    if ("increase" === e.action) r = t.param(n) / (1 + e.amount / 100), t.subtractParam(n, Math.round(r - t.param(n))); else {
                        if ("decrease" !== e.action) throw Error("type for the tag param must be increase or decrease.");
                        r = t.param(n) / (1 - e.amount / 100), t.addParam(n, Math.round(r - t.param(n)));
                    }
                });
            }
        } ]), e;
    }();
}, /* 5 */
, /* 6 */
/***/
function(e, t) {
    e.exports.getParamId = function(e) {
        switch (e) {
          case "mhp":
            return 0;

          case "mmp":
            return 1;

          case "atk":
            return 2;

          case "def":
            return 3;

          case "mat":
            return 4;

          case "mdf":
            return 5;

          case "agi":
            return 6;

          case "luk":
            return 7;

          default:
            throw Error("Unknown param.");
        }
    };
}, /* 7 */
/***/
function(e, t, r) {
    /*:
 * @plugindesc Allow states to directly affect certian stats
 *
 * @author Adam Balan
 *
 * @help
 *
 * Place <state stat: 'def' amount: +/-x%>
 *
 * stat: which stat should we increase?
 * amount: the percentage in a decimal form, eg: 0.01 is 1%
 */
    var n = r(4);
    /**
 * Global Object - Don't touch.
 *
 * Used to hold global variables, functions and such that are used across
 * the lucid scripts
 */
    window.lucidScripts = window.lucidScripts || {}, // Used to hold onto the states.
    lucidScripts.lucidStates = [], /**
 * addState - Adds a state to the player
 *
 * We are over writing this function to add in logic to process
 * the notes and get the information we need to see what we need to do.
 *
 *
 * @param {number}  stateId - the state id, for $dataState
 * @return {undefined} nothing
 */
    Game_Battler.prototype.addState = function(e) {
        this.isStateAddable(e) && (state = new n(), stateInfoArray = state.getStateNoteObjects($dataStates[e]), 
        this.isStateAffected(e) || (this.addNewState(e), this.refresh()), this.resetStateCounts(e), 
        this._result.pushAddedState(e), null !== stateInfoArray && state.applyStatChanges(stateInfoArray, this));
    }, /**
 * removeState - Removes a state to the player
 *
 * We are over writing this function to add in logic to process
 * the notes and get the information we need to see what we need to do.
 *
 * @param {number}  stateId - the state id, for $dataState
 * @return {undefined} nothing
 */
    Game_Battler.prototype.removeState = function(e) {
        this.isStateAffected(e) && (state = new n(), stateInfoArray = state.getStateNoteObjects($dataStates[e]), 
        e === this.deathStateId() && this.revive(), this.eraseState(e), null !== stateInfoArray && state.removeStateChanges(stateInfoArray, this), 
        this.refresh(), this._result.pushRemovedState(e));
    }, /**
 * subtractParam - subtracts the current param value
 *
 * Custom method to subtract a value from the current param value.
 *
 * @param {number}  paramId - The param id
 * @param {number}  value - The value for that specific param
 * @return {undefined} nothing
 */
    Game_BattlerBase.prototype.subtractParam = function(e, t) {
        this._paramPlus[e] += t, this.refresh();
    };
} ]);