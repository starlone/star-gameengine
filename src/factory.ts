import { GameObject } from './gameobject';
import { IFactoryOptions } from './options/factory.options';

export class Factory {
  static rect(opt: IFactoryOptions) {
    var x = opt.x || 0;
    var y = opt.y || 0;
    var w = opt.w || 10;
    var h = opt.h || 10;

    const isStatic = opt.static !== undefined ? opt.static : false;
    const rigidBody = opt.hasRigidBody !== undefined ? opt.hasRigidBody : true;

    var vertices = [
      { x: -w / 2, y: -h / 2 },
      { x: w / 2, y: -h / 2 },
      { x: w / 2, y: h / 2 },
      { x: -w / 2, y: h / 2 },
    ];

    return new GameObject({
      name: opt.name || '',
      position: { x, y },
      static: isStatic,
      hasRigidBody: rigidBody,
      renderer: {
        type: 'MeshRenderer',
        color: opt.color || 'blue',
      },
      vertices: vertices,
      angle: opt.angle,
    });
  }
}
