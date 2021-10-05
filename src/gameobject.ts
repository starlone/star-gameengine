import { v4 as uuidv4 } from 'uuid';
import { StarEngine } from '.';
import { Extent } from './extent';
import { IGameObjectOptions } from './options/gameobject.options';
import { RigidBody } from './physicsengine/rigidbody';
import { Point } from './point';
import { MeshRenderer } from './renderers/mesh.renderer';
import { Renderer } from './renderers/renderer';
import { Script } from './scripts/script';
import { RendererUtils } from './utils/renderer.utils';
import { ScriptUtils } from './utils/script.utils';

export class GameObject {
  uid: string;
  name: string = '';
  position: Point = new Point(0, 0);
  angle: number;
  vertices: Point[] = [];
  renderer?: Renderer;
  scripts: Script[] = [];
  rigidBody?: RigidBody;
  static: boolean;

  constructor(options: IGameObjectOptions) {
    this.uid = options.uid || uuidv4();
    this.name = options.name;
    this.position.x = options.position.x;
    this.position.y = options.position.y;
    this.angle = options.angle || 0;
    this.static = options.static || false;

    const vertices = options.vertices || [];
    this.vertices = vertices.map(point => new Point(point.x, point.y));

    if (options.renderer) {
      this.renderer = RendererUtils.parse(options.renderer);
    } else if (options.hasRenderer) {
      this.renderer = new MeshRenderer();
    }
    this.renderer?.setParent(this);

    const hasRigidBody =
      options.hasRigidBody !== undefined ? options.hasRigidBody : true;
    this.rigidBody = hasRigidBody ? new RigidBody(this) : undefined;

    if (options.scripts) {
      const scripts = options.scripts.map(obj => ScriptUtils.parse(obj));
      for (const script of scripts) {
        this.addScript(script);
      }
    }
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

  update(delta: number, correction: number, engine: StarEngine): void {
    if (this.rigidBody) this.rigidBody.update();
    this.scripts.forEach(script => script.update(delta, correction, engine));
  }

  addScript(script: Script) {
    this.scripts.push(script);
    script.setParent(this);
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
      uid: this.uid,
      name: this.name,
      position: this.position.toJSON(),
      angle: this.angle,
      static: this.static,
      vertices: this.vertices.map(obj => obj.toJSON()),
      hasRigidBody: this.rigidBody !== undefined,
      renderer: this.renderer?.toJSON(),
      scripts: this.scripts.map(obj => obj.toJSON()),
    };
  }
}
