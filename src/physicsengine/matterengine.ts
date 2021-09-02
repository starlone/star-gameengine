import Matter, { Body, Common, Engine, World } from "matter-js";
import { GameObject } from "../gameobject";
import { PhysicsEngine } from "./physicsengine";

export class MatterEngine implements PhysicsEngine {

    engine = Engine.create();

    update(delta: number, correction: number) {
        Engine.update(this.engine, delta, correction);
    }

    createBody(obj: GameObject, options: any) {
        options = options || {};
        const name = options.name || obj.name;

        if (options.canRotate === undefined) {
            options.canRotate = true;
        }

        const body = {
            label: name,
            position: { x: obj.position.x, y: obj.position.y },
            vertices: obj.vertices,
            angle: obj.angle,
            isStatic: obj.isStatic()
        };
        const newbody = Body.create(Common.extend(body, options));
        World.add(this.engine.world, newbody);
        return newbody;
        // this.updateRealPosition();
    }

    removeBody(body: any) {
        World.remove(this.engine.world, body);
    }

    setVelocity(body: any, velocity: { x: number; y: any; }) {
        Matter.Sleeping.set(body, false); // Wake up Object
        Matter.Body.setVelocity(body, velocity);
    }

}