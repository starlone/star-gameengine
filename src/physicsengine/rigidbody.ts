import { GameObject } from "../gameobject";

export class RigidBody {
    parent: GameObject;
    body: any;

    constructor(obj: GameObject) {
        this.parent = obj;
    }

    update() {
        this.parent.position.x = this.body.position.x;
        this.parent.position.y = this.body.position.y;
    }
}