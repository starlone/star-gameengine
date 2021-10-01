import { GameObject } from '../gameobject';

export abstract class Script {
  parent: GameObject;

  constructor(parent: GameObject) {
    this.parent = parent;
  }

  abstract update(delta: number, correction: number): void;
}
