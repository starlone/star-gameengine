export class Scene {
    objs = [];

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 200, 200);
    }
}