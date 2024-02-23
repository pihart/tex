const { Div, RawBlock, stdio } = require("pandoc-filter");

/**
 * Convert div.<env_name> to LaTeX environment <env_name> with contents parsed as Markdown.
 * Convert CodeBlock with language <env_name> to LaTeX environment <env_name> with contents unparsed.
 * @param ele source pandoc AST element
 * @return replacement pandoc AST element
 */
processLatex = (ele) => {
  if (!["Div", "CodeBlock"].includes(ele.t)) return;

  const [attr, childrenOrCode] = ele.c; // when Div, we have children: Block[]; when CodeBlock, we have code: string

  /**
   * @type {[string, string[], [string, string][]]}
   * attrs is key-value pairs
   */
  const [id, classList, attrs] = attr;
  const attrsMap = Object.fromEntries(attrs);

  if (classList.length !== 1) return; // Not implemented

  const [env] = classList; // Assuming that, by the next line, this is a latex env, this is that env; the name is thus appropriate
  const labelText = id ? `\\label{${id}}` : "";
  const bracketArgs = attrsMap["bracket-args"] ?? attrsMap["sbr"];
  const bracketArgsStr = bracketArgs ? `[${bracketArgs}]` : "";

  if (ele.t === "Div")
    return Div(
        ["", [], []],
        [
          RawBlock("latex", `\\begin{${env}}${bracketArgsStr}${labelText}`),
          ...childrenOrCode, // Leave this to get processed as markdown
          RawBlock("latex", `\\end{${env}}`),
        ]
    );

  if (ele.t === "CodeBlock") {
    if (["latex", "tex"].includes(env))
      return RawBlock("latex", childrenOrCode);

    return RawBlock("latex", `\\begin{${env}}${labelText}${childrenOrCode}\\end{${env}}`);
  }
};

stdio(processLatex);
