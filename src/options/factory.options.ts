import { IRigidBodyOptions } from './rigidbody.options';

export interface IFactoryOptions {
  name: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  angle?: number;

  radius?: number;
  maxSides?: number;

  static?: boolean;
  hasRigidBody?: boolean;
  color?: string;

  rigidBody?: IRigidBodyOptions;

  hasCollision?: boolean;
}
