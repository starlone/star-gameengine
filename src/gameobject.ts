import { v4 as uuidv4 } from 'uuid';
import { Extent } from './extent';
import { IGameObjectOptions } from './options/gameobject.options';
import { RigidBody } from './physicsengine/rigidbody';
import { Point } from './point';
import { MeshRenderer } from './renderers/mesh.renderer';
import { Renderer } from './renderers/renderer';
import { Script } from './scripts/script';
import { StarEngine } from './starengine';
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
  children: GameObject[] = [];
  parent?: GameObject;
  hasCollision = false;

  constructor(options: IGameObjectOptions) {
    this.uid = options.uid || uuidv4();
    this.name = options.name;
    this.position.x = options.position.x;
    this.position.y = options.position.y;
    this.angle = options.angle || 0;
    this.static = options.static || false;

    this.hasCollision = options.hasCollision || false;

    const vertices = options.vertices || [];
    this.vertices = vertices.map((point) => new Point(point.x, point.y));

    let renderer: Renderer | undefined;
    if (options.renderer) {
      renderer = RendererUtils.parse(options.renderer);
    } else if (options.hasRenderer) {
      renderer = new MeshRenderer();
    }
    if (renderer) this.setRenderer(renderer);

    this.rigidBody =
      options.rigidBody !== undefined
        ? new RigidBody(this, options.rigidBody)
        : undefined;

    if (options.children) {
      const children = options.children.map((obj) => new GameObject(obj));
      for (const child of children) {
        this.addChild(child);
      }
    }

    if (options.scripts) {
      const scripts = options.scripts.map((obj) => ScriptUtils.parse(obj));
      for (const script of scripts) {
        if (script) {
          this.addScript(script);
        }
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

    for (const child of this.children) {
      child.render(ctx, extent);
    }

    // Reset
    ctx.rotate(-this.angle);
    ctx.translate(-pos.x, -pos.y);
  }

  update(delta: number, correction: number, engine: StarEngine): void {
    if (this.rigidBody) this.rigidBody.update();
    this.scripts.forEach((script) => script.update(delta, correction, engine));
  }

  getParent(): GameObject | undefined {
    return this.parent;
  }

  setParent(parent: GameObject | undefined) {
    this.parent = parent;
  }

  setRenderer(renderer: Renderer) {
    this.renderer = renderer;
    this.renderer.setParent(this);
  }

  add(obj: GameObject | Script | undefined) {
    if (obj instanceof GameObject) {
      this.addChild(obj);
    } else if (obj instanceof Script) {
      this.addScript(obj);
    }
  }

  addChild(gameobject: GameObject) {
    this.children.push(gameobject);
    gameobject.setParent(this);
  }

  addChildAbove(from: GameObject, to: GameObject) {
    const index = this.children.indexOf(to);
    this.children.splice(index, 0, from);
    from.setParent(this);
  }

  addChildBelow(from: GameObject, to: GameObject) {
    const index = this.children.indexOf(to);
    this.children.splice(index + 1, 0, from);
    from.setParent(this);
  }

  addScript(script: Script) {
    this.scripts.push(script);
    script.setParent(this);
  }

  isStatic(): boolean {
    return this.static;
  }

  getExtent(): Extent {
    const extent = Extent.createEmpty();
    extent.extendVectors(this.vertices);
    return extent;
  }

  getRealExtent(): Extent {
    const extent = this.getExtent();
    var pos = this.getRealPosition();
    extent.move(pos);
    return extent;
  }

  getRealPosition(): Point {
    var pos = this.position.clone();

    var parent = this.parent;

    if (parent) {
      const pos2 = parent.getRealPosition();
      pos.sum(pos2);
    }

    return pos;
  }

  clone() {
    const options = this.toJSON();
    return new GameObject(options);
  }

  toJSON(): IGameObjectOptions {
    const rigidBody = this.rigidBody ? this.rigidBody.toJSON() : undefined;
    return {
      uid: this.uid,
      name: this.name,
      position: this.position.toJSON(),
      angle: this.angle,
      static: this.static,
      vertices: this.vertices.map((obj) => obj.toJSON()),
      rigidBody: rigidBody,
      renderer: this.renderer?.toJSON(),
      children: this.children.map((obj) => obj.toJSON()),
      scripts: this.scripts.map((obj) => obj.toJSON()),
    };
  }
}
