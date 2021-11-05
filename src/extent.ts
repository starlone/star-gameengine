import { Point } from './point';

export class Extent {
  min: Point;
  max: Point;

  constructor(x: number, y: number, width: number, height: number) {
    this.min = new Point(x, y);
    this.max = new Point(width, height);
  }

  static createEmpty() {
    return new Extent(Infinity, Infinity, -Infinity, -Infinity);
  }

  extendVector(vector: Point) {
    if (vector.x < this.min.x) {
      this.min.x = vector.x;
    }
    if (vector.x > this.max.x) {
      this.max.x = vector.x;
    }
    if (vector.y < this.min.y) {
      this.min.y = vector.y;
    }
    if (vector.y > this.max.y) {
      this.max.y = vector.y;
    }
    return this;
  }

  extendVectors(vectors: Point[]) {
    for (const vector of vectors) {
      this.extendVector(vector);
    }
  }

  move(vector: Point) {
    this.min.sum(vector);
    this.max.sum(vector);
  }

  contains(point: Point): boolean {
    return (
      this.min.x <= point.x &&
      point.x <= this.max.x &&
      this.min.y <= point.y &&
      point.y <= this.max.y
    );
  }
}
