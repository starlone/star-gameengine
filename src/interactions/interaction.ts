import { ViewPort } from '../viewport';

export abstract class Interaction {
  parent?: ViewPort;

  setParent(parent: ViewPort) {
    this.parent = parent;
  }

  abstract active(): void;

  abstract desactive(): void;

  abstract toJSON(): object;
}
