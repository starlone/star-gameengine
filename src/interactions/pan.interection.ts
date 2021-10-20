import { GameObject } from '..';
import { seEventPanEnd } from '../events/panend.event';
import { Point } from '../point';
import { Interaction } from './interaction';

export class PanInteraction extends Interaction {
  private last?: Point;
  private isDown: boolean = false;
  private inverse = true;

  constructor(private target: GameObject) {
    super();
  }

  mousedown(e: any) {
    this.start(e.offsetX, e.offsetY);
  }

  mouseup() {
    this.end();
  }

  mousemove(e: any) {
    this.move(e.offsetX, e.offsetY);
  }

  touchstart(e: any) {
    if (e.touches.length === 1) {
      var t = e.touches[0];
      this.start(t.pageX, t.pageY);
    }
  }

  touchend() {
    this.end();
  }

  touchmove(e: any) {
    if (e.touches.length === 1) {
      var t = e.touches[0];
      this.move(t.pageX, t.pageY);
    }
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
    element.addEventListener('mousedown', (e: any) => {
      this.mousedown(e);
    });
    element.addEventListener('mouseup', () => {
      this.mouseup();
    });
    element.addEventListener('mousemove', (e: any) => {
      this.mousemove(e);
    });
    element.addEventListener('touchstart', (e: any) => {
      this.touchstart(e);
    });
    element.addEventListener('touchend', () => {
      this.touchend();
    });
    element.addEventListener('touchmove', (e: any) => {
      this.touchmove(e);
    });
  }
  desactive(): void {
    const element = this.parent?.getElement();
    if (!element) return;
    element.removeEventListener('mousedown', (e: any) => {
      this.mousedown(e);
    });
    element.removeEventListener('mouseup', () => {
      this.mouseup();
    });
    element.removeEventListener('mousemove', (e: any) => {
      this.mousemove(e);
    });
    element.removeEventListener('touchstart', (e: any) => {
      this.touchstart(e);
    });
    element.removeEventListener('touchend', () => {
      this.touchend();
    });
  }
}
