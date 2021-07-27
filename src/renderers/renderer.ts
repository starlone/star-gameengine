import { GameObject } from "../gameobject";

export class Renderer {
    parent?: GameObject;

    constructor(parent: GameObject) {
        this.parent = parent;
    }

    render(ctx: CanvasRenderingContext2D): void {
        console.log(ctx);
    }
}