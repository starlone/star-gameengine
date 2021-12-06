import { StarEngine } from '..';
import { GameObject } from '../gameobject';
import { Script } from './script';

export class FollowObjectScript extends Script {
  targetUid: string;
  target?: GameObject;

  constructor(options: any) {
    super();
    this.targetUid = options.targetUid;
  }

  update(delta: number, correction: number, engine: StarEngine): void {
    if (!this.parent) {
      console.log(delta, correction, engine);
      return;
    }
    if (!this.target) {
      this.target = engine.getScene().getObj(this.targetUid);
    }
    if (this.target) {
      this.parent.position = this.target.position.clone();
    }
  }

  toJSON(): object {
    return { type: 'FollowObjectScript', targetUid: this.targetUid };
  }
}
