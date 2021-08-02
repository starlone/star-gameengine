import { Extent } from "./extent";
import { GameObject } from "./gameobject";
import { GradientRenderer } from "./renderers/gradient.renderer";
import { Renderer } from "./renderers/renderer";

export class Scene {
    objs: GameObject[] = [];
    renderer: Renderer = new GradientRenderer(this);

    render(ctx: CanvasRenderingContext2D, extent: Extent) {
        this.renderer.render(ctx, extent);
        this.objs.forEach(obj => obj.render(ctx, extent));
    }

    add(obj: GameObject) {
        this.objs.push(obj);
    }

    update(delta: number, correction: number) {
        this.objs.forEach(obj => obj.update(delta, correction));
    }
}