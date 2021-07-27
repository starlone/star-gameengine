import { GameObject } from "./gameobject";
import { Point } from "./point";

export class Factory {
    static rect(opt: any = {}) {
        const name = opt.name || '';

        var x = opt.x || 0;
        var y = opt.y || 0;
        var w = opt.w || 10;
        var h = opt.h || 10;

        const obj = new GameObject(name, x, y);

        obj.vertices.push(new Point(-w / 2, -h / 2));
        obj.vertices.push(new Point(w / 2, -h / 2));
        obj.vertices.push(new Point(w / 2, h / 2));
        obj.vertices.push(new Point(-w / 2, h / 2));

        return obj;
    }
}