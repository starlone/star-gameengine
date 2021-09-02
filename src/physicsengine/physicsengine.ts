import { GameObject } from "../gameobject";

export interface PhysicsEngine {
    update(delta: number, correction: number): void;

    removeBody(body: any): void;

    createBody(obj: GameObject, options: any): any;

    setVelocity(body: any, velocity: { x: number; y: any; }): void;
}