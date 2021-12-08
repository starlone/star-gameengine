import { GameObject } from '../gameobject';
import { IRigidBodyOptions } from '../options/rigidbody.options';
import { PhysicsEngine } from './physicsengine';

export class RigidBody {
  parent: GameObject;
  body: any;
  physicEngine?: PhysicsEngine;

  friction?: number;
  restitution?: number;
  density?: number;

  constructor(obj: GameObject, options: IRigidBodyOptions) {
    this.parent = obj;

    this.friction = options.friction;
    this.restitution = options.friction;
    this.density = options.density;
  }

  update() {
    this.parent.position.x = this.body.position.x;
    this.parent.position.y = this.body.position.y;
    this.parent.angle = this.body.angle;
  }

  setVelocity(x: number, y: number) {
    if (this.physicEngine) {
      this.physicEngine.setVelocity(this.body, { x, y });
    }
  }

  setPosition(x: number, y: number) {
    if (this.physicEngine) {
      this.physicEngine.setPosition(this.body, { x, y });
    }
  }

  applyForce(
    position: { x: number; y: number },
    force: { x: number; y: number }
  ) {
    if (this.physicEngine) {
      this.physicEngine.applyForce(this.body, position, force);
    }
  }

  setAngularVelocity(velocity: number) {
    if (this.physicEngine) {
      this.physicEngine.setAngularVelocity(this.body, velocity);
    }
  }

  toJSON() {
    return {
      friction: this.friction,
      restitution: this.restitution,
      density: this.density,
    };
  }
}
