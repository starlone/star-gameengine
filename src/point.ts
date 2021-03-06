export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = +x;
    this.y = +y;
  }

  move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  change(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  calcDistance(other: Point): any {
    // Catetos
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  sum(other: Point) {
    this.x = this.x + other.x;
    this.y = this.y + other.y;
    return this;
  }

  sub(other: Point) {
    this.x = this.x - other.x;
    this.y = this.y - other.y;
    return this;
  }

  multi(other: Point) {
    this.x = this.x * other.x;
    this.y = this.y * other.y;
    return this;
  }

  div(other: Point) {
    this.x = this.x / other.x;
    this.y = this.y / other.y;
    return this;
  }

  neg() {
    this.x = this.x * -1;
    this.y = this.y * -1;
    return this;
  }

  /**
   * Calculates the linearly interpolated value of x between a and b
   */

  // Formula: a + x * (b - a)
  static lerp(a: Point, b: Point, x: number) {
    const ac = a.clone();
    const bc = b.clone();
    const xc = new Point(x, x);

    return ac.sum(xc.multi(bc.sub(ac)));
  }

  clone() {
    return new Point(this.x, this.y);
  }

  toJSON(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
}
