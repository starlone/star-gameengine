import { GradientRenderer } from '../renderers/gradient.renderer';
import { MeshRenderer } from '../renderers/mesh.renderer';
import { Renderer } from '../renderers/renderer';

export abstract class RendererUtils {
  static parse(options: any): Renderer {
    if (options instanceof Renderer) {
      return options;
    }
    if (options.type === 'GradientRenderer') {
      return new GradientRenderer(options);
    }
    return new MeshRenderer(options);
  }
}
