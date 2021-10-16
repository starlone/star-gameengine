import { Extent } from './extent';
import { Point } from './point';
import { Scene } from './scene';

export class ViewPort {
  private element: any;
  private ctx: CanvasRenderingContext2D;
  private pivot: Point = new Point(0, 0);
  private scale = 1.0;

  constructor(private elementID: string) {
    if (this.elementID) {
      if (typeof this.elementID === 'string') {
        this.element = window.document.querySelector(this.elementID);
      } else {
        this.element = this.elementID;
      }
    } else {
      this.element = window.document.body;
    }

    this.element = this.element as HTMLCanvasElement;

    if (!this.element) {
      throw new Error('Element canvas not found');
    }

    if (!this.element.getContext) {
      console.log(this.element);
      throw new Error("Element don't have the getContext");
    }
    this.ctx = this.element.getContext('2d');

    window.addEventListener('resize', () => this.updateSize());
    this.updateSize();
  }

  updateSize() {
    var ele = this.element;
    var parent = ele.parentElement;
    this.setSize(parent.offsetWidth, parent.offsetHeight);
  }

  setSize(width: any, height: any) {
    this.element.width = width;
    this.element.height = height;
  }

  clear() {
    const extent = this.getExtentView();
    this.ctx.clearRect(extent.x, extent.y, extent.width, extent.height);
  }

  render(scene: Scene) {
    const camera = scene?.getCamera();
    if (camera) {
      this.updatePivot(camera.position);
    }
    this.clear();
    scene.render(this.ctx, this.getExtentView());
  }

  getExtentView(): Extent {
    return new Extent(
      this.pivot.x,
      this.pivot.y,
      this.getWidth(),
      this.getHeight()
    );
  }

  updatePivot(position: Point) {
    // Reset draw
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.scale, this.scale);

    var x = position.x - this.getWidth() / 2;
    var y = position.y - this.getHeight() / 2;
    this.pivot.change(x, y);
    this.ctx.translate(-x, -y);
  }

  getWidth() {
    return this.element.width / this.scale;
  }

  getHeight() {
    return this.element.width / this.scale;
  }
}
