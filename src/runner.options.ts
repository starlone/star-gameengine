export class RunnerOptions {
    enabled: boolean = true;
    frameRequestId?: number;
    delta?: number;
    correction = 1;
    fps = 60;
    deltaSampleSize = 60;
    counterTimestamp = 0;
    frameCounter = 0;
    deltaHistory = [];
    timePrev?: any;
    timeScalePrev = 1;
    isFixed = false;
    deltaMin?: number;
    deltaMax?: number;

    constructor(options?: any) {
        // var runner = Common.extend(defaults, options);

        this.delta = options.delta || 1000 / this.fps;
        this.deltaMin = options.deltaMin || 1000 / this.fps;
        this.deltaMax = options.deltaMax || 1000 / (this.fps * 0.5);
        this.fps = 1000 / options.delta;
    }
}