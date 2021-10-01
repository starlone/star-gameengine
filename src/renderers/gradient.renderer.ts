import { Extent } from '../extent';
import { Renderer } from './renderer';

export class GradientRenderer extends Renderer {
  color1: string = '#004CB3';
  color2: string = '#8ED6FF';

  constructor(options: any = []) {
    super();
    this.color1 = options.color || this.color1;
    this.color2 = options.color || this.color2;
  }

  render(c: CanvasRenderingContext2D, extent: Extent): void {
    var grd = c.createLinearGradient(150, 0, 150, 300);
    grd.addColorStop(0, this.color1);
    grd.addColorStop(1, this.color2);
    c.fillStyle = grd;
    c.fillRect(extent.x, extent.y, extent.width, extent.height);
  }

  clone(): Renderer {
    const options = this.toJSON();
    return new GradientRenderer(options);
  }

  toJSON() {
    return {
      type: 'GradientRenderer',
      color1: this.color1,
      color2: this.color2,
    };
  }
}
