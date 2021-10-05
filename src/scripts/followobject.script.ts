import { StarEngine } from '..';
import { GameObject } from '../gameobject';
import { Script } from './script';

export class FollowObjectScript extends Script {
  target: GameObject;

  constructor(target: GameObject) {
    super();
    this.target = target;
  }

  update(delta: number, correction: number, engine: StarEngine): void {
    if (!this.parent) {
      console.log(delta, correction, engine);
      return;
    }
    this.parent.position.x = this.target.position.x;
    this.parent.position.y = this.target.position.y;
  }

  toJSON(): object {
    return { type: 'FollowObjectScript' };
  }
}
