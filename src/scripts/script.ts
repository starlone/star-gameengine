import { GameObject } from "../gameobject";

export class Script {
    parent: GameObject;

    constructor(parent: GameObject) {
        this.parent = parent;
    }

    update(delta: number, correction: number): void {
        console.log(delta);
        console.log(correction);
    }

}