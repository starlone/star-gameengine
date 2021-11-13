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

  constructor(options: IGameObjectOptions) {
    this.uid = options.uid || uuidv4();
    this.name = options.name;
    this.position.x = options.position.x;
    this.position.y = options.position.y;
    this.angle = options.angle || 0;
    this.static = options.static || false;

    const vertices = options.vertices || [];
    this.vertices = vertices.map((point) => new Point(point.x, point.y));

    if (options.renderer) {
      this.renderer = RendererUtils.parse(options.renderer);
    } else if (options.hasRenderer) {
      this.renderer = new MeshRenderer();
    }
    this.renderer?.setParent(this);

    const hasRigidBody =
      options.hasRigidBody !== undefined ? options.hasRigidBody : true;
    this.rigidBody = hasRigidBody ? new RigidBody(this) : undefined;

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

  add(obj: any) {
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
    var pos = this.getRealPosition();
    const extent = Extent.createEmpty();
    extent.extendVectors(this.vertices);
    extent.move(pos);
    return extent;
  }

  getRealPosition() {
    return this.position;
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
      vertices: this.vertices.map((obj) => obj.toJSON()),
      hasRigidBody: this.rigidBody !== undefined,
      renderer: this.renderer?.toJSON(),
      children: this.children.map((obj) => obj.toJSON()),
      scripts: this.scripts.map((obj) => obj.toJSON()),
    };
  }
}
