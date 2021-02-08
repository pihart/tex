// For use from run config Pandoc_LaTeX_Current_File.xml

import { exec, FILTERS, TEMPLATES } from "../lib/pandoc";

const [src, out, dirname] = process.argv.slice(2);

exec(
  src,
  out,
  { template: TEMPLATES.latex, filter: FILTERS.latex, quiet: true },
  dirname
);
