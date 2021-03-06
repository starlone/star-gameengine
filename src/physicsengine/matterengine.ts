import Matter, { Body, Common, Engine, World } from 'matter-js';
import { GameObject } from '../gameobject';
import { PhysicsEngine } from './physicsengine';

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

    const position = obj.getRealPosition();

    const vertices = obj.vertices.map((point) => point.clone()); //.sum(position));

    let body: any = {
      label: name,
      position: position.toJSON(),
      vertices: vertices,
      angle: obj.angle,
      isStatic: obj.isStatic(),
    };

    if (obj.rigidBody?.friction) {
      body.friction = obj.rigidBody?.friction;
    }
    if (obj.rigidBody?.restitution) {
      body.restitution = obj.rigidBody?.restitution;
    }
    if (obj.rigidBody?.density) {
      body.density = obj.rigidBody?.density;
    }
    const newbody = Body.create(Common.extend(body, options));
    World.add(this.engine.world, newbody);

    return newbody;
  }

  removeBody(body: any) {
    World.remove(this.engine.world, body);
  }

  setVelocity(body: any, velocity: { x: number; y: number }) {
    Matter.Sleeping.set(body, false); // Wake up Object
    Matter.Body.setVelocity(body, velocity);
  }

  setPosition(body: any, velocity: { x: number; y: number }) {
    Matter.Sleeping.set(body, false); // Wake up Object
    Matter.Body.setPosition(body, velocity);
  }

  applyForce(
    body: any,
    position: { x: number; y: number },
    force: { x: number; y: number }
  ): void {
    Matter.Sleeping.set(body, false); // Wake up Object
    Matter.Body.applyForce(body, position, force);
  }

  setAngularVelocity(body: any, velocity: number): void {
    Matter.Sleeping.set(body, false); // Wake up Object
    Matter.Body.setAngularVelocity(body, velocity);
  }
}
