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

  static circle(opt: IFactoryOptions) {
    var x = opt.x || 0;
    var y = opt.y || 0;
    const radius = opt.radius || 10;
    var maxSides = opt.maxSides || 25;

    const isStatic = opt.static !== undefined ? opt.static : false;
    const rigidBody = opt.hasRigidBody !== undefined ? opt.hasRigidBody : true;

    const vertices = Factory.createCircleVertices(radius, maxSides);

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

  private static createCircleVertices(
    radius: number,
    maxSides: number
  ): { x: number; y: number }[] {
    // approximate circles with polygons until true circles implemented in SAT
    maxSides = maxSides || 25;
    var sides = Math.ceil(Math.max(10, Math.min(maxSides, radius)));

    // optimisation: always use even number of sides (half the number of unique axes)
    if (sides % 2 === 1) {
      sides += 1;
    }

    var theta = (2 * Math.PI) / sides;
    var path = '';
    var offset = theta * 0.5;

    for (var i = 0; i < sides; i++) {
      var angle = offset + i * theta;
      var xx = Math.cos(angle) * radius;
      var yy = Math.sin(angle) * radius;

      path += 'L ' + xx.toFixed(3) + ' ' + yy.toFixed(3) + ' ';
    }

    const pathPattern = /L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/gi;
    const points: { x: number; y: number }[] = [];

    path.replace(pathPattern, (_, x, y): any => {
      points.push({ x: parseFloat(x), y: parseFloat(y) });
    });

    return points;
  }
}
