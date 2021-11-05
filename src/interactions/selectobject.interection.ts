import { Interaction } from './interaction';

export class SelectObjectInteraction extends Interaction {
  private functions: any = {};

  constructor(private callback: Function) {
    super();

    this.functions.dblclick = (e: any) => {
      const obj = this.dblclick(e);
      this.callback(obj);
    };
  }

  dblclick(e: any) {
    if (!this.parent) return undefined;
    return this.parent.transformPixelToCoordinate(e.offsetX, e.offsetY);
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
