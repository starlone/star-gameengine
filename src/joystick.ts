export class Joystick {
  private x = 0;
  private y = 0;

  getAxis(name: string): number {
    if (name === 'horizontal') {
      return this.x;
    }
    if (name === 'vertical') {
      return this.y;
    }
    return 0;
  }

  setAxis(name: string, val: any) {
    if (name === 'horizontal') {
      this.x = val;
    }
    if (name === 'vertical') {
      this.y = val;
    }
  }

  resetAxis() {
    this.x = 0;
    this.y = 0;
  }
}
