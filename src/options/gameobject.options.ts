export interface IGameObjectOptions {
  name: string;
  position: { x: number; y: number };
  static?: boolean;
  hasRigidBody?: boolean;
  renderer?: any;
  angle?: number;
  vertices?: { x: number; y: number }[];
}
