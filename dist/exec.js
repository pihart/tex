"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const shelljs_1 = require("shelljs");
__exportStar(require("shelljs"), exports);
const exec = (command) => new Promise((resolve, reject) => shelljs_1.exec(command, { async: true }, (code, value, error) => {
    if (error) {
        return reject(new Error(error));
    }
    resolve(value);
}));
exports.exec = exec;
exports.default = exports.exec;
//# sourceMappingURL=exec.js.map