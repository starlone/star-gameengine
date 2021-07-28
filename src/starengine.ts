import { Runner } from "./runner";
import { Scene } from "./scene";
import { ViewPort } from "./viewport";

export class StarEngine {

  private runner = new Runner();
  private scene = new Scene();
  private viewport?: ViewPort;

  constructor(private elementID: string, scene?: Scene) {
    if (scene) {
      this.scene = scene;
    }
  }

  getScene() {
    return this.scene;
  }

  start(): void {
    if (!this.viewport) {
      this.viewport = new ViewPort(this.elementID);
    }

    this.runner.start(this);
  }

  update(delta: number, correction: number) {
    this.scene.update(delta, correction);
  }
}
