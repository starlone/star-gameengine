import { GameObject } from '../gameobject';

export abstract class Script {
  parent?: GameObject;

  setParent(parent: GameObject) {
    this.parent = parent;
  }

  abstract update(delta: number, correction: number): void;
}
