import { GameObject } from './gameobject';
import { IFactoryOptions } from './options/factory.options';
import { Point } from './point';
import { MeshRenderer } from './renderers/mesh.renderer';

export class Factory {
  static rect(opt: IFactoryOptions) {
    const name = opt.name || '';

    var x = opt.x || 0;
    var y = opt.y || 0;
    var w = opt.w || 10;
    var h = opt.h || 10;

    const isStatic = opt.static !== undefined ? opt.static : false;
    const hasRigidBody =
      opt.hasRigidBody !== undefined ? opt.hasRigidBody : true;

    const rend = new MeshRenderer({
      color: opt.color || 'blue',
    });

    const obj = new GameObject(name, x, y, {
      renderer: rend,
      static: isStatic,
      hasRigidBody: hasRigidBody,
    });

    obj.vertices.push(new Point(-w / 2, -h / 2));
    obj.vertices.push(new Point(w / 2, -h / 2));
    obj.vertices.push(new Point(w / 2, h / 2));
    obj.vertices.push(new Point(-w / 2, h / 2));

    return obj;
  }
}
