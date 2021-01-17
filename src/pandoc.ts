import * as path from "path";
import exec, { cd } from "./exec";

const pandoc = (
  src: string,
  out: string,
  options: { [key: string]: string | boolean } = {},
  pwd = ""
) => {
  cd(pwd);

  const { "-o": _, ...rest } = options;

  const cliOptions = Object.entries({ ...rest, output: out })
    .map(([key, val]: [string, string | boolean]) => {
      const keyPrepended =
        val === false ? "" : key.startsWith("-") ? ` ${key}` : ` --${key}`;

      const valWrapped =
        typeof val === "boolean" ? "" : ` "${val.replace(/"/g, `\\"`)}"`;

      return `${keyPrepended}${valWrapped}`;
    })
    .join("");
  return exec(`pandoc ${src}${cliOptions}`);
};

export default pandoc;

export const TEMPLATES = { latex: path.join(__dirname, "pandoc-template.tex") };

export const FILTERS = { latex: path.join(__dirname, "filters", "latex.js") };
