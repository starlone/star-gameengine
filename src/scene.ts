import { GameObject } from "./gameobject";

export class Scene {
    objs: GameObject[] = [];

    render(ctx: CanvasRenderingContext2D) {
        this.objs.forEach(obj => obj.render(ctx));
    }

    add(obj: GameObject) {
        this.objs.push(obj);
    }
}