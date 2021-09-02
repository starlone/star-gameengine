import { GameObject } from "../gameobject";
import { PhysicsEngine } from "./physicsengine";

export class RigidBody {
    parent: GameObject;
    body: any;
    physicEngine?: PhysicsEngine;

    constructor(obj: GameObject) {
        this.parent = obj;
    }

    update() {
        this.parent.position.x = this.body.position.x;
        this.parent.position.y = this.body.position.y;
        this.parent.angle = this.body.angle;
    }

    setVelocity(x: number, y: any) {
        if (this.physicEngine) {
            this.physicEngine.setVelocity(this.body, { x, y });
        }
    }

}