import { IRigidBodyOptions } from './rigidbody.options';

export interface IGameObjectOptions {
  uid?: string;
  name: string;
  position: { x: number; y: number };
  static?: boolean;
  rigidBody?: IRigidBodyOptions;
  renderer?: any;
  angle?: number;
  vertices?: { x: number; y: number }[];
  hasRenderer?: boolean;
  children?: IGameObjectOptions[];
  scripts?: any[];
  hasCollision?: boolean;
}
