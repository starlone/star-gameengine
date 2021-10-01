import { StarEngine } from './starengine';

export class Runner {
  fps = 60;
  correction = 1;
  deltaSampleSize = 60;
  counterTimestamp = 0;
  frameCounter = 0;
  deltaHistory: number[] = [];
  timePrev?: number;
  timeScalePrev = 1;
  enabled = true;

  delta = 0;
  deltaMin = 0;
  deltaMax = 0;

  frameRequestId = 0;

  timing = {
    timestamp: 0,
    timeScale: 1,
    lastDelta: 0,
    lastElapsed: 0,
  };

  constructor() {
    this.delta = 1000 / this.fps;
    this.deltaMin = 1000 / this.fps;
    this.deltaMax = 1000 / (this.fps * 0.5);
    this.fps = 1000 / this.delta;
  }

  run(engine: any): any {
    const self = this;
    (function render(time?: number) {
      self.frameRequestId = window.requestAnimationFrame(render);

      if (time && self.enabled) {
        self.tick(engine, time);
      }
      engine.render();
    })();

    return this;
  }

  stop() {
    window.cancelAnimationFrame(this.frameRequestId);
  }

  start(engine: any) {
    this.run(engine);
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  tick(engine: StarEngine, time: number) {
    let timing = this.timing;
    let correction = 1;
    let delta;

    // dynamic timestep based on wall clock between calls
    delta = (this.timePrev && time - this.timePrev) || this.delta;
    this.timePrev = time;

    // optimistically filter delta over a few frames, to improve stability
    this.deltaHistory.push(delta);
    this.deltaHistory = this.deltaHistory.slice(-this.deltaSampleSize);
    delta = Math.min.apply(null, this.deltaHistory);

    // limit delta
    delta = delta < this.deltaMin ? this.deltaMin : delta;
    delta = delta > this.deltaMax ? this.deltaMax : delta;

    // correction for delta
    correction = delta / this.delta;

    // update engine timing object
    this.delta = delta;

    // time correction for time scaling
    if (this.timeScalePrev !== 0)
      correction *= timing.timeScale / this.timeScalePrev;

    if (timing.timeScale === 0) correction = 0;

    this.timeScalePrev = timing.timeScale;
    this.correction = correction;

    // fps counter
    this.frameCounter += 1;
    if (time - this.counterTimestamp >= 1000) {
      this.fps = this.frameCounter * ((time - this.counterTimestamp) / 1000);
      this.counterTimestamp = time;
      this.frameCounter = 0;
    }

    engine.update(delta, correction);
  }
}
