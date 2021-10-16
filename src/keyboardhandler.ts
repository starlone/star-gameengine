import { Joystick } from './joystick';

export class KeyboardHandler {

  static add(joystick: Joystick) {
    document.addEventListener('keydown', function (e) {
      KeyboardHandler.keydown(e.key, joystick);
    });
    document.addEventListener('keyup', function (e) {
      KeyboardHandler.keyup(e.key, joystick);
    });
  }

  static keydown(key: string, joystick: Joystick) {
    key = key.toLowerCase();
    if (['arrowleft', 'a'].includes(key)) {
      // Left
      joystick.setAxis('horizontal', -1);
    } else if (['arrowright', 'd'].includes(key)) {
      // 'right'
      joystick.setAxis('horizontal', 1);
    } else if (['arrowup', 'w'].includes(key)) {
      // Up
      joystick.setAxis('vertical', -1);
    } else if (['arrowdown', 's'].includes(key)) {
      // 'Down'
      joystick.setAxis('vertical', 1);
    }
  }

  static keyup(key: string, joystick: Joystick) {
    key = key.toLowerCase();
    if (['arrowleft', 'arrowright', 'a', 'd'].includes(key)) {
      joystick.setAxis('horizontal', 0);
    } else if (['arrowup', 'arrowdown', 'w', 's'].includes(key)) {
      joystick.setAxis('vertical', 0);
    }
  }
}
