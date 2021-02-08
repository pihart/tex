import * as path from "path";
import * as shell from "./shell";

const escapeString = (str: string) => str.replace(/"/g, `\\"`);
const wrapString = (str: string) => `"${escapeString(str)}"`;

export const exec = async (
  src: string,
  fileNameNoExt: string,
  options: { [key: string]: string | boolean } = {},
  pwd = ""
) => {
  shell.cd(pwd);

  const { "-o": _, ...rest } = options;

  const cliOptions = Object.entries<string | boolean>({
    ...rest,
    output: `${fileNameNoExt}.tex`,
  })
    .map(([key, val]) => {
      const keyPrepended =
        val === false ? "" : key.startsWith("-") ? key : `--${key}`;

      const valWrapped = typeof val === "boolean" ? "" : wrapString(val);

      return `${keyPrepended} ${valWrapped}`;
    })
    .join(" ");

  const pdfLaTeX = () =>
    shell.exec(`pdflatex ${wrapString(fileNameNoExt)} -halt-on-error`);
  await shell.exec(`pandoc ${wrapString(src)} ${cliOptions}`);
  await pdfLaTeX();
  await shell.exec(`bibtex ${wrapString(fileNameNoExt)}`);
  await pdfLaTeX();
  await pdfLaTeX();
  await shell.rm(
    ["aux", "bbl", "blg", "log", "out", "tex"].map(
      (ext) => `${fileNameNoExt}.${ext}`
    )
  );
};

export const TEMPLATES = {
  latex: path.join(__dirname, "..", "pandoc-template.tex"),
};

export const FILTERS = {
  latex: path.join(__dirname, "..", "filters", "latex.js"),
};
