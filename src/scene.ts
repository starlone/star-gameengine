import { Extent } from './extent';
import { GameObject } from './gameobject';
import { MatterEngine } from './physicsengine/matterengine';
import { PhysicsEngine } from './physicsengine/physicsengine';
import { SimpleCollisionEngine } from './physicsengine/simplecollisionengine';
import { Point } from './point';
import { GradientRenderer } from './renderers/gradient.renderer';
import { Renderer } from './renderers/renderer';
import { StarEngine } from './starengine';

export class Scene {
  camera: GameObject;
  objs: GameObject[] = [];
  renderer: Renderer = new GradientRenderer(this);
  physicEngine: PhysicsEngine = new MatterEngine();
  collisionEngine = new SimpleCollisionEngine();

  constructor(options?: any) {
    options = options || {};

    let objs = options.objs || [];

    objs = objs.map((obj: any) => new GameObject(obj));
    for (const obj of objs) {
      this.add(obj);
    }

    if (options.indexCamera === undefined) {
      this.camera = new GameObject({
        name: 'MainCamera',
        static: true,
        position: {
          x: 0,
          y: 0,
        },
        renderer: undefined,
      });
      this.add(this.camera);
    } else {
      this.camera = this.objs[options.indexCamera];
    }
  }

  getCamera() {
    return this.camera;
  }

  getObj(uid: string): GameObject | undefined {
    return this.objs.find((obj) => obj.uid === uid);
  }

  render(ctx: CanvasRenderingContext2D, extent: Extent) {
    this.renderer.render(ctx, extent);
    this.objs.forEach((obj) => obj.render(ctx, extent));
  }

  add(obj: GameObject) {
    if (obj.rigidBody) {
      const body = this.physicEngine.createBody(obj, {});
      obj.rigidBody.body = body;
      obj.rigidBody.physicEngine = this.physicEngine;
    }
    if (obj.hasCollision) {
      this.collisionEngine.createBody(obj);
    }
    this.objs.push(obj);
  }

  update(delta: number, correction: number, engine: StarEngine) {
    this.physicEngine.update(delta, correction);
    this.collisionEngine.update();
    this.objs.forEach((obj) => obj.update(delta, correction, engine));
  }

  getObjectByCoordinate(coordinate: Point) {
    var objs = this.objs;
    for (var i = objs.length - 1; i >= 0; i--) {
      var obj = objs[i];
      if (obj.getRealExtent().contains(coordinate)) {
        return obj;
      }
    }
    return undefined;
  }

  clone(): Scene {
    const json = this.toJSON();
    return new Scene(json);
  }

  toJSON(): object {
    const index = this.camera ? this.objs.indexOf(this.camera) : -1;
    const indexCamera = index !== -1 ? index : undefined;

    return {
      objs: this.objs.map((obj) => obj.toJSON()),
      indexCamera,
    };
  }
}
