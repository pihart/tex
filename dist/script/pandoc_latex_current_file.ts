// For use from run config Pandoc_LaTeX_Current_File.xml

import { exec, FILTERS, TEMPLATES } from "../lib/pandoc";

const [src, fileNameNoExt, dirname] = process.argv.slice(2);

exec(
  src,
  fileNameNoExt,
  {
    template: TEMPLATES.latex,
    filter: FILTERS.latex,
    quiet: true,
    citeproc: true,
  },
  dirname
);
