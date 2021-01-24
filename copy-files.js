const { cp } = require("shelljs");

cp("src/pandoc-template.tex", "dist");
