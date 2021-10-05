import { Joystick } from '../joystick';
import { Script } from './script';

export class PlataformPlayerScript extends Script {
  joystick: Joystick;
  speed: number;

  constructor(joystick: Joystick, speed: number) {
    super();
    this.joystick = joystick;
    this.speed = speed || 1;
  }

  update(delta: number, correction: number): void {
    if (!this.parent?.rigidBody) {
      throw Error("Object don't have rigidbody");
    }
    let x = (this.joystick.getAxis('horizontal') * delta * correction) / 10;
    x = x || 0;
    var vel = this.parent.rigidBody.body.velocity;
    if (x) {
      x = vel.x + x * this.speed;
      if (x > 16) {
        x = 16;
      }
      if (x < -16) {
        x = -16;
      }
    }
    this.parent.rigidBody.setVelocity(x, vel.y);
  }
}
