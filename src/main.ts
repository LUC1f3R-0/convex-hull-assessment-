import { convexHull } from "./convex-hull.js";
import { getRectangleCorners, normalizeRectangle, polygonPerimeter } from "./geometry.js";
import { readProgramInput } from "./input.js";
import type { Point, Rectangle } from "./types.js";

type ParseResult =
  | { ok: true; rectangles: Rectangle[] }
  | { ok: false; message: string };

function parseInput(raw: string): ParseResult {
  const lines = raw
    .trim()
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return { ok: false, message: "Input is empty." };
  }

  const rectangleCount = Number(lines[0]);
  if (!Number.isFinite(rectangleCount) || !Number.isInteger(rectangleCount) || rectangleCount < 1) {
    return { ok: false, message: "N must be a positive integer." };
  }

  const coordinateLines = lines.slice(1);
  const coordinateText = coordinateLines.join(" ");
  const parts = coordinateText.split(/\s+/).filter((part) => part.length > 0);
  const expectedCount = rectangleCount * 4;

  if (parts.length !== expectedCount) {
    return {
      ok: false,
      message: `Expected ${expectedCount} coordinate values for ${rectangleCount} rectangles, but received ${parts.length}.`,
    };
  }

  const values = parts.map(Number);
  for (let index = 0; index < values.length; index++) {
    if (!Number.isFinite(values[index])) {
      return { ok: false, message: `Invalid non-numeric coordinate at position ${index + 1}.` };
    }
  }

  const rectangles: Rectangle[] = [];
  for (let rectangleIndex = 0; rectangleIndex < rectangleCount; rectangleIndex++) {
    const base = rectangleIndex * 4;
    rectangles.push(
      normalizeRectangle(
        values[base]!,
        values[base + 1]!,
        values[base + 2]!,
        values[base + 3]!,
      ),
    );
  }

  return { ok: true, rectangles };
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
  try {
    const raw = await readProgramInput();
    const parsed = parseInput(raw);

    if (!parsed.ok) {
      console.error(parsed.message);
      process.exitCode = 1;
      return;
    }

    const output = solve(parsed.rectangles);
    const inputBlock = raw.trimEnd();
    process.stdout.write(`Input:\n${inputBlock}\n\nOutput:\n${output}\n`);
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

main();
