import { Renderer } from "../renderers/renderer";

export interface IGameObjectOptions {
    static?: boolean;
    hasRigidBody?: boolean
    renderer?: Renderer;
    angle?: number

}