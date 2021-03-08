import * as Licenses from "../includes/licenses";

/**
 * Type for LaTeX source
 */
type LaTeX = string;

/**
 * String matching /^[a-z]+$/
 */
type BasicString = string;

/**
 * A map between a LaTeX package option and what it should do
 */
export interface Rule {
  /**
   * The callable option name
   *
   * Used like `\usepackage[<name>]{avimehra.sty}`.
   */
  name: BasicString;

  /**
   * LaTeX source to be called if the option is provided
   */
  if?: LaTeX;

  /**
   * LaTeX source to be called if the option is missing
   */
  else?: LaTeX;

  /**
   * Commented out documentation
   *
   * Will be included in the generated sty file above the rule logic.
   */
  description?: `%${string}`;
}

/**
 * Generate a sty file for a LaTeX package with given rules
 * @param rules The options handled by the package
 * @param packageName The name of the package that is provided
 * @param license The license for the file as a LaTeX comment
 * @param header Any text in the source code above the license, usually as a LaTeX comment
 * @return The sty file contents
 */
const generateSty = (
  rules: Rule[],
  packageName = "avimehra",
  license = Licenses.MIT,
  header = "% avimehra.sty"
): LaTeX => {
  const options = rules.map(
    ({
      name,
    }) => `\\newif\\ifavimehragenerated${name}\\avimehragenerated${name}false
\\DeclareOption{${name}}{\\avimehragenerated${name}true}`
  );

  // cannot indent entire blocks because they may internally depend on whitespace (e.g. verbatim)
  const cases = rules.map(
    ({ name, if: ifCommand = "", else: elseCommand = "", description }) => `${
      description
        ? `%%%%%%%%%%%%%%%%
${description}
%%%%%%%%%%%%%%%%
`
        : ""
    }\\ifavimehragenerated${name}
  ${ifCommand}
\\else
  ${elseCommand}
\\fi`
  );

  return `${header}
${license}

\\ProvidesPackage{${packageName}}

${options.join("\n\n")}

\\ProcessOptions\\relax

${cases.join("\n\n")}`;
};

export default generateSty;
