import { StarEngine } from '..';
import { Script } from './script';

export class PlataformPlayerScript extends Script {
  speed: number;

  constructor(options: any) {
    super();
    this.speed = options.speed || 1;
  }

  update(delta: number, correction: number, engine: StarEngine): void {
    if (!this.parent?.rigidBody) {
      console.log(this.parent);
      throw Error("Object don't have rigidbody");
    }
    let x = engine.getJoystick().getAxis('horizontal');
    x = (x * delta * correction) / 10;
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

  toJSON(): object {
    return { type: 'PlataformPlayerScript', speed: this.speed };
  }
}
