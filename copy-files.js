const { cp } = require("shelljs");

cp("src/pandoc-template.tex", "dist");
cp("-r", "src/filters", "dist");
