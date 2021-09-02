import { Extent } from "./extent";
import { IGameObjectOptions } from "./options/gameobject.options";
import { RigidBody } from "./physicsengine/rigidbody";
import { Point } from "./point";
import { MeshRenderer } from "./renderers/mesh.renderer";
import { Renderer } from "./renderers/renderer";
import { Script } from "./scripts/script";

export class GameObject {
    name: string = "";
    position: Point = new Point(0, 0);
    angle = 0;
    vertices: Point[] = [];
    renderer?: Renderer;
    scripts: Script[] = [];
    rigidBody?: RigidBody;
    static = false;

    constructor(name: string, x: number, y: number, options: IGameObjectOptions) {
        this.name = name;
        this.position.x = x;
        this.position.y = y;
        this.angle = options.angle || this.angle;
        this.static = options.static || this.static;

        this.renderer = options.renderer || new MeshRenderer();
        this.renderer?.setParent(this);

        const hasRigidBody = options.hasRigidBody != undefined ? options.hasRigidBody : true;
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
        if (this.rigidBody)
            this.rigidBody.update();
        this.scripts.forEach(script => script.update(delta, correction));
    }

    addScript(script: Script) {
        this.scripts.push(script);
    }

    isStatic(): boolean {
        return this.static;
    }

}