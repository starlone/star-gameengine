import { GameObject } from "../gameobject";
import { Point } from "../point";
import { Renderer } from "./renderer";

export class MeshRenderer extends Renderer {

    color: string = 'blue';
    fillStyle: string = 'black';
    strokeStyle: string = 'solid';
    lineWidth: number = 1;


    constructor(parent: GameObject, options: any = []) {
        super(parent);
        this.color = options.color || this.color;
        this.fillStyle = options.fillStyle || this.fillStyle;
        this.lineWidth = options.lineWidth || this.lineWidth;
        this.strokeStyle = options.strokeStyle || this.strokeStyle;
    }

    render(c: CanvasRenderingContext2D): void {
        if (!this.parent || !this.parent.vertices || !this.parent.vertices.length) {
            console.log('Problema no render do objeto', this.parent);
            return;
        }

        const vertices: Point[] = this.parent.vertices;

        c.beginPath();
        c.moveTo(vertices[0].x, vertices[0].y);

        for (var j = 1; j < vertices.length; j++) {
            c.lineTo(vertices[j].x, vertices[j].y);
        }

        c.lineTo(vertices[0].x, vertices[0].y);
        c.closePath();

        c.fillStyle = this.color;
        if (this.strokeStyle) {
            c.lineWidth = this.lineWidth;
            c.strokeStyle = this.strokeStyle;
            c.stroke();
        }

        c.fill();

    }
}