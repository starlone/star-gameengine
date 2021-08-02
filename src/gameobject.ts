import { Extent } from "./extent";
import { Point } from "./point";
import { MeshRenderer } from "./renderers/mesh.renderer";
import { Renderer } from "./renderers/renderer";
import { Script } from "./scripts/script";

export class GameObject {
    name: string = "";
    position: Point = new Point(0, 0);
    vertices: Point[] = [];
    renderer?: Renderer;
    scripts: Script[] = [];

    constructor(name: string, x: number, y: number, options: any = {}) {
        this.name = name;
        this.position.x = x;
        this.position.y = y;
        this.renderer = options.renderer || new MeshRenderer(this);
    }

    render(ctx: CanvasRenderingContext2D, extent: Extent): void {
        var pos = this.position;

        ctx.translate(pos.x, pos.y);

        if (this.renderer) {
            this.renderer.render(ctx, extent);
        }

        // Reset
        ctx.translate(-pos.x, -pos.y);
    }

    update(delta: number, correction: number): void {
        this.scripts.forEach(script => script.update(delta, correction));
    }

    addScript(script: Script) {
        this.scripts.push(script);
    }

}