import generateSty from "../../lib/generate-sty";
import { readFile, writeFile } from "fs/promises";
import * as path from "path";

async function execute() {
  const [
    math,
    computing,
    color,
    physics,
    links,
    handout,
    theorem,
    thin,
    thmboxed,
    footer,
    page,
    header,
  ] = (
    await Promise.all(
      [
        "math",
        "computing",
        "color",
        "physics",
        "links",
        "handout",
        "theorem",
        "thin",
        "thmboxed",
        "footer",
        "page",
        "header",
      ].map((name) => readFile(path.join(__dirname, `includes/${name}.sty`)))
    )
  ).map((file) => file.toString());

  const rules = [
    { name: "nomath", else: math },
    { name: "nocolor", else: color, description: "% Prevents defining colors" },
    { name: "nohandout", else: handout },
    {
      name: "computing",
      else: computing,
      description: "% Computing\n% Requires `color`",
    },
    { name: "footnote", if: "\\RequirePackage[bottom]{footmisc}" },
    { name: "physics", if: physics },
    {
      name: "links",
      if: links,
      description:
        "% Color links, apply hyperref, and add graphic next to links called with \\href\n% Requires `color`",
    },
    { name: "header", if: header },
    { name: "footer", if: footer },
    { name: "theorem", if: theorem },
    { name: "thmboxed", if: thmboxed },
    { name: "page", if: page },
    { name: "thin", if: thin },
  ];

  await writeFile(path.join(__dirname, "../../../texmf/tex/latex/avimehra.sty"), generateSty(rules));
}

execute();
