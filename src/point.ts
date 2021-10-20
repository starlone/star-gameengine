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

  sub(other: Point) {
    this.x = this.x - other.x;
    this.y = this.y - other.y;
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

  clone() {
    return new Point(this.x, this.y);
  }

  toJSON(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
}
