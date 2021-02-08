"use strict";
// For use from run config Pandoc_LaTeX_Current_File.xml
Object.defineProperty(exports, "__esModule", { value: true });
const pandoc_1 = require("../lib/pandoc");
const [src, out, dirname] = process.argv.slice(2);
pandoc_1.exec(src, out, {
    template: pandoc_1.TEMPLATES.latex,
    filter: pandoc_1.FILTERS.latex,
    quiet: true,
    citeproc: true,
}, dirname);
