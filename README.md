# tex

Utilities I commonly use with LaTeX

## LaTeX

### worksheet.sty

[avimehra.sty]

All-encompassing package

To use, make it visible to your LaTeX engine.

### Generate your own package file

[generate-sty.ts](src/lib/generate-sty.ts)

Example: [avimehra.sty.ts](src/script/sty/avimehra.sty.ts) is used to generate the aforementioned [avimehra.sty].

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

##### Style presets (assume [avimehra.sty] is visible)

- pset
  - for problem set solutions
- default-style
  - for textbook-style worksheets

##### Use packages

Use the config parameter `package`, which is an array of objects (each is henceforth referred to as `package`) of any of these types (can mix-and-match):

- string
  - `\usepackage{<package>}`
- { name: string }
  - `\usepackage{<package.name>}`
- { name: string, options: string }
  - `\usepackage[<package.options>]{<package.name>}`

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

### Compile file to LaTeX in place (no temp/aux files)

[pandoc_latex_current_file.ts](src/script/pandoc_latex_current_file.ts)

Uses the pandoc filter and template from above.

Call as `ts-node ./src/pandoc_latex_current_file.ts <src> <out> <dirname>`.
Can also use `node ./dist/pandoc_latex_current_file.js <src> <out> <dirname>` if [dist/pandoc_latex_current_file.js](dist/pandoc_latex_current_file.js) exists.
Usually used on a Markdown file.

#### IntelliJ/JetBrains Run Configuration

By adding the run configuration [Pandoc_LaTeX_Current_File.xml](.idea/runConfigurations/Pandoc_LaTeX_Current_File.xml), clicking run will actually compile the currently opened file in place, hence the name.

[avimehra.sty]: texmf/tex/latex/avimehra.sty
