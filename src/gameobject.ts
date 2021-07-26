import { Point } from "./point";

export class GameObject {
    name: string = "";
    position: Point = new Point(0, 0);

    constructor(name:string, x:number, y:number) {
        this.name = name;
        this.position.x = x;
        this.position.y = y;
    }

    render(ctx: CanvasRenderingContext2D): void {
        var pos = this.position;

        ctx.translate(pos.x, pos.y);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 50, 50);

        // Reset
        ctx.translate(-pos.x, -pos.y);
    }
}