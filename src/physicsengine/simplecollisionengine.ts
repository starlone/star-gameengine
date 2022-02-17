import { GameObject } from '..';
import { Extent } from '../extent';

export class SimpleCollisionEngine {
  private bodies: { extent: Extent; obj: GameObject }[] = [];

  removeBody(body: any): void {
    const index = this.bodies.indexOf(body);
    if (index !== -1) this.bodies.splice(0, index);
  }

  createBody(obj: GameObject) {
    this.bodies.push({ extent: obj.getExtent(), obj });
  }

  update() {
    for (let i = 0; i < this.bodies.length; i++) {
      const bodyA = this.bodies[i];
      const extentA = bodyA.extent.clone().move(bodyA.obj.position);
      for (let j = i + 1; j < this.bodies.length; j++) {
        const bodyB = this.bodies[j];
        const extentB = bodyB.extent.clone().move(bodyB.obj.position);
        if (extentA.intersects(extentB)) {
          for (let script of bodyA.obj.scripts) {
            script.onTriggerEnter(bodyB.obj);
          }
          for (let script of bodyB.obj.scripts) {
            script.onTriggerEnter(bodyA.obj);
          }
        }
      }
    }
  }
}
