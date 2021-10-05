import { StarEngine } from '..';
import { GameObject } from '../gameobject';

export abstract class Script {
  parent?: GameObject;

  setParent(parent: GameObject) {
    this.parent = parent;
  }

  abstract update(delta: number, correction: number, engine: StarEngine): void;
  abstract toJSON(): object;
}
