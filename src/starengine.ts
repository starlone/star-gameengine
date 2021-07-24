import { Scene } from "./scene";
import { ViewPort } from "./viewport";

export class StarEngine {

  private viewport?: ViewPort;
  private scene: Scene = new Scene();

  constructor(private elementID: string, scene?: Scene) {
    if (scene) {
      this.scene = scene;
    }
  }

  run(): void {
    if (!this.viewport) {
      this.viewport = new ViewPort(this.elementID);
    }
    console.log(this.viewport)
    console.log('Start');
    this.viewport.render(this.scene);
  }
}
