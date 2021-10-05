import { StarEngine } from '..';
import { Script } from './script';

export class FreeMoveScript extends Script {
  speed: number;

  constructor(options: any) {
    super();
    this.speed = options.speed || 1;
  }

  update(delta: number, correction: number, engine: StarEngine): void {
    let x = engine.getJoystick().getAxis('horizontal') || 0;
    let y = engine.getJoystick().getAxis('vertical') || 0;
    if (x) {
      x *= this.speed * delta * correction;
    }
    if (y) {
      y *= this.speed * delta * correction;
    }
    this.parent?.position.move(x, y);
  }

  toJSON(): object {
    return { type: 'FreeMoveScript', speed: this.speed };
  }
}
