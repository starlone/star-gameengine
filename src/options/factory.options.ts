export interface IFactoryOptions {
    name: string;
    x?: number;
    y?: number;
    w?: number;
    h?: number;

    static?: boolean;
    hasRigidBody?: boolean
    color?: string;

}