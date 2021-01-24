"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILTERS = exports.TEMPLATES = void 0;
const path = require("path");
const exec_1 = require("./exec");
const escapeString = (str) => str.replace(/"/g, `\\"`);
const wrapString = (str) => `"${escapeString(str)}"`;
const pandoc = (src, out, options = {}, pwd = "") => {
    exec_1.cd(pwd);
    const { "-o": _ } = options, rest = __rest(options, ["-o"]);
    const cliOptions = Object.entries(Object.assign(Object.assign({}, rest), { output: out }))
        .map(([key, val]) => {
        const keyPrepended = val === false ? "" : key.startsWith("-") ? ` ${key}` : ` --${key}`;
        const valWrapped = typeof val === "boolean" ? "" : ` ` + wrapString(val);
        return `${keyPrepended}${valWrapped}`;
    })
        .join("");
    return exec_1.default(`pandoc ${wrapString(src)}${cliOptions}`);
};
exports.default = pandoc;
exports.TEMPLATES = {
    latex: path.join(__dirname, "..", "pandoc-template.tex"),
};
exports.FILTERS = {
    latex: path.join(__dirname, "..", "filters", "latex.js"),
};
