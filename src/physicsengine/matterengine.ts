import { Engine, World } from "matter-js";
import { PhysicsEngine } from "./physicsengine";

export class MatterEngine implements PhysicsEngine {
    engine = Engine.create();

    update(delta: number, correction: number) {
        Engine.update(this.engine, delta, correction);
    }

    addBody(body: any) {
        World.add(this.engine.world, body);
    }

    removeBody(body: any) {
        World.remove(this.engine.world, body);
    }

}