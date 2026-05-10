# optimal-patrol-path

## Project Overview

**optimal-patrol-path** is a small TypeScript CLI for an algorithmic programming assessment. The program is intended to read rectangle coordinates from standard input and write a single computed result to standard output. It is a console-style solution: no web server, no database, and no frontend.

This repository currently contains only project scaffolding, scripts, and placeholders. The assessment logic is not implemented yet.

## How to Install

Requirements: **Node.js 18+** and **npm**.

```bash
cd optimal-patrol-path
npm install
```

## How to Run

**Development** (run TypeScript directly):

```bash
npm run dev
```

**Production-style** (compile, then run Node on the output):

```bash
npm run build
npm start
```

You can pipe a test file:

```bash
npm run build && npm start < test-inputs/sample-1.txt
```

## Input Format

> **TODO:** Document the exact stdin format once the problem statement is finalized (line count, coordinate order, separators, integer vs. floating-point, etc.).

Expected shape at a high level: rectangle definitions read from stdin, to be parsed in `src/main.ts` when implementation begins.

## Output Format

> **TODO:** Document the exact stdout format (precision, trailing newline, single value vs. multiple lines).

## Algorithm Explanation

> **TODO:** Replace this section with the actual approach (e.g. why rectangles are transformed the way they are, role of convex hull or patrol path, any key lemmas). No mathematical solution is described here yet.

## Complexity

> **TODO:** State time and space complexity in terms of **n** (and other parameters) after the algorithm is chosen and implemented.

## Notes

- Source lives under `src/`; compiled JavaScript is emitted to `dist/` by `npm run build`.
- Placeholder modules: `geometry.ts`, `convex-hull.ts`, and `types.ts` — extend them when solving the problem; they must not contain solution logic in this skeleton.
- Keep the solution deterministic and stdin/stdout-only unless the assessment allows otherwise.
