import type { Point, Rectangle } from "./types.js";

export function normalizeRectangle(x1: number, y1: number, x2: number, y2: number): Rectangle {
  return {
    left: Math.min(x1, x2),
    right: Math.max(x1, x2),
    bottom: Math.min(y1, y2),
    top: Math.max(y1, y2),
  };
}

export function getRectangleCorners(rectangle: Rectangle): Point[] {
  return [
    { x: rectangle.left, y: rectangle.bottom },
    { x: rectangle.left, y: rectangle.top },
    { x: rectangle.right, y: rectangle.bottom },
    { x: rectangle.right, y: rectangle.top },
  ];
}

export function cross(origin: Point, a: Point, b: Point): number {
  return (a.x - origin.x) * (b.y - origin.y) - (a.y - origin.y) * (b.x - origin.x);
}

export function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

export function polygonPerimeter(points: Point[]): number {
  if (points.length < 2) {
    return 0;
  }
  let sum = 0;
  for (let index = 0; index < points.length; index++) {
    const nextIndex = (index + 1) % points.length;
    sum += distance(points[index]!, points[nextIndex]!);
  }
  return sum;
}
