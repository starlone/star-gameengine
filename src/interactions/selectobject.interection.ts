import { GameObject, Scene } from '..';
import { Interaction } from './interaction';

export class SelectObjectInteraction extends Interaction {
  private functions: any = {};

  constructor(private scene: Scene, private callback: Function) {
    super();

    this.functions.dblclick = (e: any) => {
      const obj = this.dblclick(e);
      this.callback(obj);
    };
  }

  dblclick(e: any) {
    return this.getObject(e.offsetX, e.offsetY);
  }

  getObject(x: number, y: number): GameObject | undefined {
    if (!this.parent) return undefined;

    console.log(x, y)

    const coordinate = this.parent.transformPixelToCoordinate(x, y);
    return this.scene.getObjectByCoordinate(coordinate);
  }

  active(): void {
    const element = this.parent?.getElement();
    if (!element) return;

    element.addEventListener('dblclick', this.functions.dblclick);
  }

  desactive(): void {
    const element = this.parent?.getElement();
    if (!element) return;

    element.removeEventListener('dblclick', this.functions.dblclick);
  }
}
