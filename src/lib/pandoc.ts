import * as path from "path";
import * as shell from "./exec";

const escapeString = (str: string) => str.replace(/"/g, `\\"`);
const wrapString = (str: string) => `"${escapeString(str)}"`;

const exec = (
  src: string,
  out: string,
  options: { [key: string]: string | boolean } = {},
  pwd = ""
) => {
  shell.cd(pwd);

  const { "-o": _, ...rest } = options;

  const cliOptions = Object.entries<string | boolean>({ ...rest, output: out })
    .map(([key, val]) => {
      const keyPrepended =
        val === false ? "" : key.startsWith("-") ? key : `--${key}`;

      const valWrapped = typeof val === "boolean" ? "" : wrapString(val);

      return `${keyPrepended} ${valWrapped}`;
    })
    .join(" ");
  return shell.exec(`pandoc ${wrapString(src)} ${cliOptions}`);
};

export default exec;

export const TEMPLATES = {
  latex: path.join(__dirname, "..", "pandoc-template.tex"),
};

export const FILTERS = {
  latex: path.join(__dirname, "..", "filters", "latex.js"),
};
