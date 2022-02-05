import { StarEngine } from '..';
import { GameObject } from '../gameobject';

export abstract class Script {
  parent?: GameObject;

  abstract update(delta: number, correction: number, engine: StarEngine): void;

  abstract toJSON(): object;

  setParent(parent: GameObject) {
    this.parent = parent;
  }

  onTriggerEnter(_: GameObject) {
    if (!this.parent) {
      console.error('Parent not found');
    }
  }
}
