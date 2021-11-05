import { Joystick } from './joystick';
import { Runner } from './runner';
import { Scene } from './scene';
import { ViewPort } from './viewport';

export class StarEngine {
  private runner = new Runner();
  private scene = new Scene();
  private viewport: ViewPort;
  private joystick = new Joystick();

  constructor(elementID: string, scene?: Scene) {
    if (scene) {
      this.scene = scene;
    }
    this.viewport = new ViewPort(elementID);
  }

  getScene() {
    return this.scene;
  }

  setScene(newscene: Scene) {
    this.scene = newscene;
  }

  getViewport(): ViewPort {
    return this.viewport;
  }

  start(): void {
    this.viewport.active();
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
    this.scene.update(delta, correction, this);
  }

  render() {
    this.viewport?.render(this.scene);
  }

  getJoystick() {
    return this.joystick;
  }
}
