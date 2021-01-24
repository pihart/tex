---
title: github:pihart/tex Example
author: Avi Mehra
pset: true
---

Hi.

# Some problems

::: probboxed
What is $2 + 2$?
::::

To solve this we use the following lemma:

::: lemmaboxed
\label{lemma:double}

$$
    a + a = 2a.
$$

:::

::: proof
Trivial.
:::

::: corboxed
There are no integers $a$, $b$, $c$, and $n > 2$ satisfying

$$
    a^n + b^n = c^n.
$$

:::

::: proof
Direct result of Lemma \ref{lemma:double}.
:::

Use the tools yourself with `npm i github:pihart/tex`.
View source files at <https://github.com/pihart/tex>.
