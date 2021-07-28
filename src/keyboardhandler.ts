import { Joystick } from "./joystick";

export class KeyboardHandler {
    joy: Joystick;

    constructor(joystick: Joystick) {
        var self = this;
        this.joy = joystick;
        document.addEventListener('keydown', function (e) {
            self.keydown(e.key);
        });
        document.addEventListener('keyup', function (e) {
            self.keyup(e.key);
        });
    }

    keydown(key: string) {
        if (key === 'ArrowLeft') { // Left
            this.joy.setAxis('horizontal', -1);
        } else if (key === 'ArrowRight') { // 'right'
            this.joy.setAxis('horizontal', 1);
        } else if (key === 'ArrowUp') { // Up
            this.joy.setAxis('vertical', -1);
        } else if (key === 'ArrowDown') { // 'Down'
            this.joy.setAxis('vertical', 1);
        }
    }

    keyup(key: string) {
        if (key === 'ArrowLeft' || key === 'ArrowRight') {
            this.joy.setAxis('horizontal', 0);
        } else if (key === 'ArrowUp' || key === 'ArrowDown') {
            this.joy.setAxis('vertical', 0);
        }
    }
}


