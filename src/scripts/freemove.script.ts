import { Joystick } from '../joystick';
import { Script } from './script';

export class FreeMoveScript extends Script {
  joystick: Joystick;
  speed: number;

  constructor(joystick: Joystick, speed: number) {
    super();
    this.joystick = joystick;
    this.speed = speed || 1;
  }

  update(delta: number, correction: number): void {
    let x = this.joystick.getAxis('horizontal') || 0;
    let y = this.joystick.getAxis('vertical') || 0;
    if (x) {
      x *= this.speed * delta * correction;
    }
    if (y) {
      y *= this.speed * delta * correction;
    }
    this.parent?.position.move(x, y);
  }
}
