# optimal-patrol-path

## Get started

Requirements: **Node.js 18+** and **npm**.

```bash
cd optimal-patrol-path
npm install
npm run build
```

Run the program:

```bash
npm start
```

To run TypeScript without building:

```bash
npm run dev
```

---

## How to use it

### Input

- The first line is **N**, the number of axis-aligned rectangles (**positive integer**).
- After that you must provide exactly **4 × N** numeric coordinate values (whitespace-separated). They can be split across several lines.
- Each group of four values is one rectangle as **x1 y1 x2 y2** (two opposite corners; order and sign are handled inside the program).

**Interactive terminal:** type the first line (N), press Enter, then keep entering lines until the program has received **4 × N** numbers in total. It stops as soon as the count is correct (no need to send end-of-file).

**Piped or redirected input:** supply the same text on stdin, for example:

```bash
npm start < path/to/input.txt
```

### What you should see (results)

On success, **standard output** is a single line: the convex-hull perimeter as a fixed-decimal number (**10** digits after the decimal point), followed by a newline. For example:

```text
12.0000000000
```

If the data is invalid (bad N, wrong number of coordinates, or non-numeric values), the program prints a short message on **standard error** and exits with a non-zero status; it does not print an answer on stdout.

---

## Quick examples

One rectangle:

```text
1
0 0 4 2
```

Two rectangles on one line after N:

```text
2
1 1 4 3 5 9 7 5
```

Same as two lines of four numbers each:

```text
2
1 1 4 3
5 9 7 5
```
