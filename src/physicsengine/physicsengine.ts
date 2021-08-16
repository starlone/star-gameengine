export interface PhysicsEngine {
    update(delta: number, correction: number): void;

    addBody(body: any): void;

    removeBody(body: any): void;
}