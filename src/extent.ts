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
    return this;
  }

  contains(point: Point): boolean {
    return (
      this.min.x <= point.x &&
      point.x <= this.max.x &&
      this.min.y <= point.y &&
      point.y <= this.max.y
    );
  }

  /**
   * Determine if one extent intersects another.
   * @param {Extent} other Other extent.
   * @return {boolean} The two extents intersect.
   * @api
   */
  intersects(other: Extent): boolean {
    return (
      this.min.x <= other.max.x &&
      this.max.x >= other.min.x &&
      this.min.y <= other.max.y &&
      this.max.y >= other.min.y
    );
  }

  clone() {
    return new Extent(this.min.x, this.min.y, this.max.x, this.max.y);
  }
}
