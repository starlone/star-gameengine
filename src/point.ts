export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
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
    var dx = this.x - other.x;
    var dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  clone() {
    return new Point(this.x, this.y);
  }

  toJSON(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
}
