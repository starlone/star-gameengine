import { GameObject } from '..';
import { seEventPanEnd } from '../events/panend.event';
import { Point } from '../point';
import { Interaction } from './interaction';

export class PanInteraction extends Interaction {
  private last?: Point;
  private isDown: boolean = false;
  private inverse = true;
  private functions: any = {};

  constructor(private target: GameObject) {
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
  }

  end() {
    this.isDown = false;
    document.dispatchEvent(seEventPanEnd);
  }

  move(x: number, y: number) {
    const viewport = this.parent;
    if (!this.isDown || !viewport || !this.last) {
      return;
    }
    var point = new Point(x, y);
    var newpoint = point.clone();
    newpoint.sub(this.last);
    if (this.inverse) {
      newpoint.neg();
    }
    const scale = viewport.getScale();
    newpoint.div(new Point(scale, scale));
    this.target.position.move(newpoint.x, newpoint.y);
    this.last = point;
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
