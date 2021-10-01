import { Joystick } from './joystick';
import { Runner } from './runner';
import { Scene } from './scene';
import { ViewPort } from './viewport';

export class StarEngine {
  private runner = new Runner();
  private scene = new Scene();
  private viewport?: ViewPort;
  private joystick = new Joystick();

  constructor(private elementID: string, scene?: Scene) {
    if (scene) {
      this.scene = scene;
    }
  }

  getScene() {
    return this.scene;
  }

  setScene(newscene: Scene) {
    this.scene = newscene;
  }

  start(): void {
    if (!this.viewport) {
      this.viewport = new ViewPort(this.elementID);
    }

    this.runner.start(this);
  }

  stop(): void {
    this.runner.stop();
  }

  enable() {
    this.runner.enable();
  }

  disable() {
    this.runner.disable();
  }

  isEnabled(): boolean {
    return this.runner.isEnabled();
  }

  update(delta: number, correction: number) {
    this.scene.update(delta, correction);
  }

  render() {
    this.viewport?.render(this.scene);
  }

  getJoystick() {
    return this.joystick;
  }
}
