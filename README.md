# tex

Utilities I commonly use with LaTeX

## LaTeX

### worksheet.sty

[worksheet.sty](texmf/tex/latex/worksheet.sty)

All-encompassing package

To use, make it visible to your LaTeX engine.

## pandoc/Markdown

```shell
npm i https://github.com/pihart/tex
```

### Template

[pandoc-template.tex](src/pandoc-template.tex)

A bare-bones LaTeX template for use in pandoc.
Tested with pdflatex.

#### Configuration

Set config params with front-matter or cli options.

##### Style presets (assume `worksheet.sty` is visible)

- pset
  - for problem set solutions
- default-worksheet
  - for textbook-style worksheets

##### Use packages

Use the config parameter `package`, which is an array of objects (hence each referred to as `package`) of any of these types (can mix-and-match):

- string
  - `\usepackage{<package>}`
- { name: string }
  - `\usepackage{<package.name>}`
- { name: string, options: string }
  - `\usepackage[<options>]{<package.name>}`

##### Other config options

- title
- author
- date
- prompt
- abstract
- figure-here
  - whether to override float placement for `figure` as `htbp`

### Filter

[latex.js](src/filters/latex.js)

Filters the pandoc AST to improve syntax for LaTeX environments

### Compile file to LaTeX in place

[pandoc_latex_current_file.ts](src/pandoc_latex_current_file.ts)

Uses the pandoc filter and template from above.

Call as `ts-node ./src/pandoc_latex_current_file.ts <src> <out> <dirname>`.
Can also use `node ./dist/pandoc_latex_current_file.js <src> <out> <dirname>` if [dist/pandoc_latex_current_file.js](dist/pandoc_latex_current_file.js) exists.
Usually used on a Markdown file.

#### IntelliJ/JetBrains Run Configuration

By adding the run configuration [Pandoc_LaTeX_Current_File.xml](.idea/runConfigurations/Pandoc_LaTeX_Current_File.xml), clicking run will actually compile the currently opened file in place, hence the name.
