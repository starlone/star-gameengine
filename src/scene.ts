import { Extent } from './extent';
import { GameObject } from './gameobject';
import { MatterEngine } from './physicsengine/matterengine';
import { PhysicsEngine } from './physicsengine/physicsengine';
import { GradientRenderer } from './renderers/gradient.renderer';
import { Renderer } from './renderers/renderer';

export class Scene {
  objs: GameObject[] = [];
  renderer: Renderer = new GradientRenderer(this);
  physicEngine: PhysicsEngine = new MatterEngine();

  constructor(options?: any) {
    if (!options) {
      return;
    }

    let objs = options.objs || [];

    objs = objs.map((obj: any) => new GameObject(obj));
    for (const obj of objs) {
      this.add(obj);
    }
  }

  render(ctx: CanvasRenderingContext2D, extent: Extent) {
    this.renderer.render(ctx, extent);
    this.objs.forEach(obj => obj.render(ctx, extent));
  }

  add(obj: GameObject) {
    if (obj.rigidBody) {
      const body = this.physicEngine.createBody(obj, {});
      obj.rigidBody.body = body;
      obj.rigidBody.physicEngine = this.physicEngine;
    }
    this.objs.push(obj);
  }

  update(delta: number, correction: number) {
    this.physicEngine.update(delta, correction);
    this.objs.forEach(obj => obj.update(delta, correction));
  }

  clone(): Scene {
    const json = this.toJSON();
    return new Scene(json);
  }

  toJSON(): object {
    return { objs: this.objs.map(obj => obj.toJSON()) };
  }
}
