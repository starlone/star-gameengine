import { Extent } from '../extent';
import { GameObject } from '../gameobject';

export abstract class Renderer {
  parent?: GameObject;

  setParent(parent: GameObject) {
    this.parent = parent;
  }

  abstract render(ctx: CanvasRenderingContext2D, extent: Extent): void;

  abstract clone(): Renderer;
}
