import { Point } from '../point';
import { Interaction } from './interaction';

export class PanInteraction extends Interaction {
  private last?: Point;
  private isDown: boolean = false;
  private functions: any = {};

  constructor(
    private callbackStart: Function,
    private callbackEnd: Function,
    private callbackMove: Function
  ) {
    super();

    this.functions.mousedown = (e: any) => {
      this.start(e.offsetX, e.offsetY);
    };

    this.functions.mouseup = () => {
      this.end();
    };

    this.functions.mousemove = (e: any) => {
      this.move(e.offsetX, e.offsetY);
    };

    this.functions.touchstart = (e: any) => {
      if (e.touches.length !== 1) return;

      var t = e.touches[0];
      this.start(t.pageX, t.pageY);
    };

    this.functions.touchend = () => {
      this.end();
    };

    this.functions.touchmove = (e: any) => {
      if (e.touches.length !== 1) return;

      var t = e.touches[0];
      this.move(t.pageX, t.pageY);
    };
  }

  start(x: number, y: number) {
    this.last = new Point(x, y);
    this.isDown = true;
    const coordinate = this.parent?.transformPixelToCoordinate(x, y);
    this.callbackStart(coordinate);
  }

  end() {
    this.isDown = false;
    this.callbackEnd();
  }

  move(x: number, y: number) {
    const viewport = this.parent;
    if (!this.isDown || !viewport || !this.last) {
      return;
    }
    const point = new Point(x, y);
    const newpoint = point.clone();
    newpoint.sub(this.last);
    this.last = point;

    const scale = viewport.getScale();
    newpoint.div(new Point(scale, scale));

    this.callbackMove(newpoint);
  }

  active(): void {
    this.isDown = false;
    this.last = undefined;

    const element = this.parent?.getElement();
    if (!element) return;

    element.addEventListener('mousedown', this.functions.mousedown);
    element.addEventListener('mouseup', this.functions.mouseup);
    element.addEventListener('mousemove', this.functions.mousemove);
    element.addEventListener('touchstart', this.functions.touchstart);
    element.addEventListener('touchend', this.functions.touchend);
    element.addEventListener('touchmove', this.functions.touchmove);
  }

  desactive(): void {
    this.isDown = false;
    this.last = undefined;

    const element = this.parent?.getElement();
    if (!element) return;

    element.removeEventListener('mousedown', this.functions.mousedown);
    element.removeEventListener('mouseup', this.functions.mouseup);
    element.removeEventListener('mousemove', this.functions.mousemove);
    element.removeEventListener('touchstart', this.functions.touchstart);
    element.removeEventListener('touchend', this.functions.touchend);
    element.removeEventListener('touchmove', this.functions.touchmove);
  }
}
