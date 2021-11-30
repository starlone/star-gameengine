import { GameObject } from '../gameobject';
import { PhysicsEngine } from './physicsengine';

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
}
