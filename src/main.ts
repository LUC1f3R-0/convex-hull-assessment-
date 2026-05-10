import { convexHull } from "./convex-hull.js";
import { getRectangleCorners, normalizeRectangle, polygonPerimeter } from "./geometry.js";
import { readProgramInput } from "./input.js";
import type { Point, Rectangle } from "./types.js";

function parseInput(input: string): Rectangle[] {
  const lines = input
    .trim()
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const firstLine = lines[0];
  if (firstLine === undefined) {
    return [];
  }

  const lineCount = Number(firstLine);
  const rectangles: Rectangle[] = [];

  for (let index = 1; index <= lineCount && index < lines.length; index++) {
    const line = lines[index];
    if (line === undefined) {
      break;
    }
    const values = line
      .split(/[\s,]+/)
      .filter((part) => part.length > 0)
      .map(Number);
    if (values.length < 4) {
      break;
    }
    const x1 = values[0]!;
    const y1 = values[1]!;
    const x2 = values[2]!;
    const y2 = values[3]!;
    rectangles.push(normalizeRectangle(x1, y1, x2, y2));
  }

  return rectangles;
}

function solve(rectangles: Rectangle[]): string {
  const allPoints: Point[] = [];
  for (const rectangle of rectangles) {
    allPoints.push(...getRectangleCorners(rectangle));
  }

  const hullPoints = convexHull(allPoints);
  const perimeter = polygonPerimeter(hullPoints);
  return perimeter.toFixed(10);
}

async function main(): Promise<void> {
  const input = await readProgramInput();
  const rectangles = parseInput(input);
  const output = solve(rectangles);
  process.stdout.write(`${output}\n`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
