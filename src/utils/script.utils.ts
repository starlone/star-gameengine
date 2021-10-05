import { PlataformPlayerScript } from '..';
import { Script } from '../scripts/script';

export abstract class ScriptUtils {
  static parse(options: any): Script {
    if (options instanceof Script) {
      return options;
    }
    // if (options.type === 'PlataformPlayerScript') {
    //   return new PlataformPlayerScript(options);
    // }
    return new PlataformPlayerScript(options);
  }
}
