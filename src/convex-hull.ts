import { cross } from "./geometry.js";
import type { Point } from "./types.js";

export function convexHull(points: Point[]): Point[] {
  if (points.length <= 1) {
    return points.slice();
  }

  const sortedPoints = [...points].sort((a, b) => {
    if (a.x !== b.x) {
      return a.x - b.x;
    }
    return a.y - b.y;
  });

  const uniquePoints: Point[] = [];
  for (const currentPoint of sortedPoints) {
    if (uniquePoints.length === 0) {
      uniquePoints.push(currentPoint);
      continue;
    }
    const lastPoint = uniquePoints[uniquePoints.length - 1]!;
    if (lastPoint.x !== currentPoint.x || lastPoint.y !== currentPoint.y) {
      uniquePoints.push(currentPoint);
    }
  }

  if (uniquePoints.length <= 1) {
    return uniquePoints.slice();
  }

  if (uniquePoints.length === 2) {
    return uniquePoints.slice();
  }

  const lowerHull: Point[] = [];
  for (const currentPoint of uniquePoints) {
    while (lowerHull.length >= 2) {
      const size = lowerHull.length;
      const secondLastOnLower = lowerHull[size - 2]!;
      const lastOnLower = lowerHull[size - 1]!;
      if (cross(secondLastOnLower, lastOnLower, currentPoint) <= 0) {
        lowerHull.pop();
      } else {
        break;
      }
    }
    lowerHull.push(currentPoint);
  }

  const upperHull: Point[] = [];
  for (let index = uniquePoints.length - 1; index >= 0; index--) {
    const currentPoint = uniquePoints[index]!;
    while (upperHull.length >= 2) {
      const size = upperHull.length;
      const secondLastOnUpper = upperHull[size - 2]!;
      const lastOnUpper = upperHull[size - 1]!;
      if (cross(secondLastOnUpper, lastOnUpper, currentPoint) <= 0) {
        upperHull.pop();
      } else {
        break;
      }
    }
    upperHull.push(currentPoint);
  }

  lowerHull.pop();
  upperHull.pop();
  return lowerHull.concat(upperHull);
}
