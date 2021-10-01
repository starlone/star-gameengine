import { Extent } from './extent';
import { IGameObjectOptions } from './options/gameobject.options';
import { RigidBody } from './physicsengine/rigidbody';
import { Point } from './point';
import { MeshRenderer } from './renderers/mesh.renderer';
import { Renderer } from './renderers/renderer';
import { Script } from './scripts/script';
import { RendererUtils } from './utils/renderer.utils';

export class GameObject {
  name: string = '';
  position: Point = new Point(0, 0);
  angle = 0;
  vertices: Point[] = [];
  renderer: Renderer = new MeshRenderer();
  scripts: Script[] = [];
  rigidBody?: RigidBody;
  static = false;

  constructor(options: IGameObjectOptions) {
    this.name = options.name;
    this.position.x = options.position.x;
    this.position.y = options.position.y;
    this.angle = options.angle || this.angle;
    this.static = options.static || this.static;

    const vertices = options.vertices || [];
    this.vertices = vertices.map(point => new Point(point.x, point.y));

    this.renderer =
      options.renderer !== undefined
        ? RendererUtils.parse(options.renderer)
        : this.renderer;
    this.renderer?.setParent(this);

    const hasRigidBody =
      options.hasRigidBody !== undefined ? options.hasRigidBody : true;
    this.rigidBody = hasRigidBody ? new RigidBody(this) : undefined;
  }

  render(ctx: CanvasRenderingContext2D, extent: Extent): void {
    var pos = this.position;

    ctx.translate(pos.x, pos.y);
    ctx.rotate(this.angle);

    if (this.renderer) {
      this.renderer.render(ctx, extent);
    }

    // Reset
    ctx.rotate(-this.angle);
    ctx.translate(-pos.x, -pos.y);
  }

  update(delta: number, correction: number): void {
    if (this.rigidBody) this.rigidBody.update();
    this.scripts.forEach(script => script.update(delta, correction));
  }

  addScript(script: Script) {
    this.scripts.push(script);
  }

  isStatic(): boolean {
    return this.static;
  }

  clone() {
    const options = this.toJSON();
    return new GameObject(options);
  }

  toJSON(): IGameObjectOptions {
    return {
      name: this.name,
      position: this.position.toJSON(),
      angle: this.angle,
      static: this.static,
      vertices: this.vertices.map(obj => obj.toJSON()),
      hasRigidBody: this.rigidBody !== undefined,
      renderer: this.renderer?.toJSON(),
    };
  }
}
