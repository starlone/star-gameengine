import { Point } from "./point";
import { MeshRenderer } from "./renderers/mesh.renderer";
import { Renderer } from "./renderers/renderer";

export class GameObject {
    name: string = "";
    position: Point = new Point(0, 0);
    vertices: Point[] = [];
    renderer?: Renderer;

    constructor(name: string, x: number, y: number, options: any = {}) {
        this.name = name;
        this.position.x = x;
        this.position.y = y;
        this.renderer = options.renderer || new MeshRenderer(this);
    }

    render(ctx: CanvasRenderingContext2D): void {
        var pos = this.position;

        ctx.translate(pos.x, pos.y);

        if (this.renderer) {
            this.renderer.render(ctx);
        }

        // Reset
        ctx.translate(-pos.x, -pos.y);
    }

    update(delta: number, correction: number): void {
        console.log(delta);
        console.log(correction);
    }
}