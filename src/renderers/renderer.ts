import { Extent } from "../extent";
import { GameObject } from "../gameobject";
import { Scene } from "../scene";

export class Renderer {
    parent?: GameObject | Scene;

    constructor(parent: GameObject | Scene) {
        this.parent = parent;
    }

    render(ctx: CanvasRenderingContext2D, extent: Extent): void {
        console.log(ctx);
        console.log(extent);
    }
}