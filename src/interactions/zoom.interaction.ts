import { Point } from '../point';
import { Interaction } from './interaction';

export class ZoomInteraction extends Interaction {
  private _distance: any;
  private functions: any = {};

  constructor() {
    super();

    this.functions.wheel = (e: any) => {
      this.wheel(e);
    };

    this.functions.touchstart = (e: any) => {
      this.touchstart(e);
    };

    this.functions.touchmove = (e: any) => {
      this.touchmove(e);
    };
  }

  wheel(e: any) {
    var viewport = this.parent;
    if (!viewport) return;

    var y = 0.05;
    if (e.deltaY > 0) {
      y *= -1;
    }
    var newscale = viewport.getScale() + y;
    viewport.setScale(newscale);
  }

  touchstart(e: any) {
    if (e.touches.length !== 2) return;

    var a1 = this.parseTouchToVector(e.touches[0]);
    var a2 = this.parseTouchToVector(e.touches[1]);
    this._distance = a1.calcDistance(a2);
  }

  touchmove(e: any) {
    if (e.touches.length !== 2) return;

    var viewport = this.parent;
    if (!viewport) return;

    var b1 = this.parseTouchToVector(e.touches[0]);
    var b2 = this.parseTouchToVector(e.touches[1]);
    var distance = b1.calcDistance(b2);

    var difference = 0;
    if (this._distance !== undefined) {
      difference = ((distance - this._distance) * 2) / 1000;
    }
    this._distance = distance;

    var newscale = viewport.getScale() + difference;
    viewport.setScale(newscale);
  }

  parseTouchToVector(touch: any) {
    return new Point(touch.pageX, touch.pageY);
  }

  active() {
    const element = this.parent?.getElement();
    if (!element) return;
    element.addEventListener('wheel', this.functions.wheel);
    element.addEventListener('touchstart', this.functions.touchstart);
    element.addEventListener('touchmove', this.functions.touchmove);
  }

  desactive() {
    const element = this.parent?.getElement();
    if (!element) return;
    element.removeEventListener('wheel', this.functions.wheel);
    element.removeEventListener('touchstart', this.functions.touchstart);
    element.removeEventListener('touchmove', this.functions.touchmove);
  }
}
