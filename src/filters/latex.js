const { Div, RawBlock, stdio } = require("pandoc-filter");

const LATEX_ENVS = [
  ...[
    ...["theorem", "lemma", "corollary", "proposition", "conjecture"],
    ...[
      "answer",
      "case",
      "claim",
      "conjecture",
      "definition",
      "exercise",
      "example",
      "fact",
      "note",
      "problem",
      "remark",
      "question",
    ],
  ]
    .map((env) => [env, `${env}*`])
    .flat(),
  ...["ex", "exr", "prob", "prop", "q", "thm", "cor", "def", "lemma"].map(
    (env) => `${env}boxed`
  ),
];

/**
 * Convert div.<env_name> to LaTeX environment <env_name> with contents parsed as Markdown.
 * Convert CodeBlock with language <env_name> to LaTeX environment <env_name> with contents unparsed.
 * @param ele source pandoc AST element
 * @return replacement pandoc AST element
 */
processLatex = (ele) => {
  if (!["Div", "CodeBlock"].includes(ele.t)) return;

  const [attr, childrenOrCode] = ele.c; // when Div, children: Block[]; when CodeBlock, code: string
  const [, classList] = attr;
  if (classList.length !== 1) return; // Not implemented

  const [env] = classList; // Assuming that, by the next line, this is a latex env, this is that env; the name is thus appropriate

  if (LATEX_ENVS.includes(env)) {
    if (ele.t === "Div") {
      return Div(
        ["", [], []],
        [
          RawBlock("latex", `\\begin{${env}}`),
          ...childrenOrCode, // Leave this to get processed as markdown
          RawBlock("latex", `\\end{${env}}`),
        ]
      );
    } else if (ele.t === "CodeBlock") {
      return RawBlock("latex", `\\begin{${env}}${childrenOrCode}\\end{${env}}`);
    }
  }
};

stdio(processLatex);
