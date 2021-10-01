import { Renderer } from '../renderers/renderer';

export interface IGameObjectOptions {
  name: string;
  position: { x: number; y: number };
  static?: boolean;
  hasRigidBody?: boolean;
  renderer?: Renderer;
  angle?: number;
  vertices?: { x: number; y: number }[];
}
