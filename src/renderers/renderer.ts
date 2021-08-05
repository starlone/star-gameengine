import { Extent } from "../extent";
import { GameObject } from "../gameobject";

export class Renderer {
    parent?: GameObject;

    constructor(parent?: GameObject) {
        this.parent = parent;
    }

    render(ctx: CanvasRenderingContext2D, extent: Extent): void {
        console.log(ctx);
        console.log(extent);
    }
}