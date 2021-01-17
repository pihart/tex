// For use from run config Pandoc_LaTeX_Current_File.xml

import pandoc, { FILTERS, TEMPLATES } from "./pandoc";

const [src, out, dirname] = process.argv.slice(2);

pandoc(
  src,
  out,
  { template: TEMPLATES.latex, filter: FILTERS.latex, quiet: true },
  dirname
);
