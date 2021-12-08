import { StarEngine } from '..';
import { Script } from './script';

export class FreeMoveScript extends Script {
  speed: number;

  constructor(options: any) {
    super();
    this.speed = options.speed || 1;
  }

  update(delta: number, correction: number, engine: StarEngine): void {
    if (!this.parent) return;
    let x = engine.getJoystick().getAxis('horizontal') || 0;
    let y = engine.getJoystick().getAxis('vertical') || 0;
    if (x) {
      x *= this.speed * delta * correction;
    }
    if (y) {
      y *= this.speed * delta * correction;
    }
    if (x || y) {
      const pos = this.parent.position;
      pos.move(x, y);
      this.parent.rigidBody?.setPosition(pos.x, pos.y);
    }
  }

  toJSON(): object {
    return { type: 'FreeMoveScript', speed: this.speed };
  }
}
