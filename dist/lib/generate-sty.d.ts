/**
 * Type for LaTeX source
 */
declare type LaTeX = string;
/**
 * String matching /^[a-z]+$/
 */
declare type BasicString = string;
/**
 * A map between a LaTeX package option and what it should do
 * @property description Commented out documentation
 */
export declare type Rule = {
    name: BasicString;
    if?: LaTeX;
    else?: LaTeX;
    description?: string;
};
/**
 * Generate a sty file for a LaTeX package with given rules
 * @param rules The options handled by the package
 * @param rules.name The callable option name
 * @param rules.if LaTeX source to be called if the option is provided
 * @param rules.else LaTeX source to be called if the option is missing
 * @param rules.description Commented out documentation
 * @param packageName The name of the package that is provided
 * @param license The license for the file as a LaTeX comment
 * @param header Any text in the source code above the license, usually as a LaTeX comment
 * @return The sty file contents
 */
declare const generateSty: (rules: Rule[], packageName?: string, license?: string, header?: string) => LaTeX;
export default generateSty;
