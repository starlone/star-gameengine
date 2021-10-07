import { FollowObjectScript, FreeMoveScript, PlataformPlayerScript } from '..';
import { Script } from '../scripts/script';

export abstract class ScriptUtils {
  static parse(options: any): Script | undefined {
    if (options instanceof Script) {
      return options;
    }
    if (options.type === 'FreeMoveScript') {
      return new FreeMoveScript(options);
    }

    if (options.type === 'PlataformPlayerScript') {
      return new PlataformPlayerScript(options);
    }

    if (options.type === 'FollowObjectScript') {
      return new FollowObjectScript(options);
    }

    return undefined;
  }
}
