import { StarEngine } from '..';
import { GameObject } from '../gameobject';
import { Point } from '../point';
import { Script } from './script';

export class SmoothFollowObjectScript extends Script {
  targetUid: string;
  target?: GameObject;
  correctionPosition?: Point;

  constructor(options: any) {
    super();
    this.targetUid = options.targetUid;
    this.correctionPosition = options.correctionPosition;
  }

  update(delta: number, correction: number, engine: StarEngine): void {
    if (!this.parent) {
      console.log(delta, correction);
      return;
    }
    if (!this.target) {
      this.target = engine.getScene().getObj(this.targetUid);
    }
    if (this.target) {
      const newposition = Point.lerp(
        this.parent.position,
        this.target.position,
        0.1
      );
      if (this.correctionPosition) {
        newposition.sum(this.correctionPosition);
      }
      this.parent.position = newposition;
    }
  }

  toJSON(): object {
    return { type: 'SmoothFollowObjectScript', targetUid: this.targetUid };
  }
}
