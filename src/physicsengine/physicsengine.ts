import { GameObject } from '../gameobject';

export interface PhysicsEngine {
  update(delta: number, correction: number): void;

  removeBody(body: any): void;

  createBody(obj: GameObject, options: any): any;

  setVelocity(body: any, velocity: { x: number; y: number }): void;

  setPosition(body: any, arg1: { x: number; y: number }): void;

  applyForce(
    body: any,
    position: { x: number; y: number },
    force: { x: number; y: number }
  ): void;

  setAngularVelocity(body: any, velocity: number): void;
}
