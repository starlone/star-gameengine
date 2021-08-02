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
        key = key.toLowerCase();
        if (['arrowleft', 'a'].includes(key)) { // Left
            this.joy.setAxis('horizontal', -1);
        } else if (['arrowright', 'd'].includes(key)) { // 'right'
            this.joy.setAxis('horizontal', 1);
        } else if (['arrowup', 'w'].includes(key)) { // Up
            this.joy.setAxis('vertical', -1);
        } else if (['arrowdown', 's'].includes(key)) { // 'Down'
            this.joy.setAxis('vertical', 1);
        }
    }

    keyup(key: string) {
        key = key.toLowerCase();
        if (['arrowleft', 'arrowright', 'a', 'd'].includes(key)) {
            this.joy.setAxis('horizontal', 0);
        } else if (['arrowup', 'arrowdown', 'w', 's'].includes(key)) {
            this.joy.setAxis('vertical', 0);
        }
    }
}


