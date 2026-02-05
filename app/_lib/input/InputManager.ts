import { KeyboardHandler } from './KeyboardHandler';
import { GamepadHandler } from './GamepadHandler';
import defaultMapping from './mappings/defaultMapping.json';

type Device = 'keyboard' | 'gamepad';

/* Un interface define la estructura que va a tener un objeto de JS */
type Binding =
  | { device: 'keyboard'; code: string }
  | {
      device: 'gamepad';
      xbox: string;
      playstation: string;
      switch: string;
      joycon_l?: string;
      joycon_r?: string;
      generic?: string;
    };

/* Action es un tipo enum, por lo que solo elije uno de los casos definidos */
type Action =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'upleft'
  | 'upright'
  | 'setArrowUp'
  | 'setArrowDown'
  | 'setArrowLeft'
  | 'setArrowRight'
  | 'setArrowUpLeft'
  | 'setArrowUpRight'
  | 'start'
  | 'exit';
type InputContext = 'menu' | 'gameplay' | 'edit';

/* Record es un tipo que nos ayuda a crear tipos que sean llave-valor */
/* Partial indica que no se van a usar todos los tipos de Action en los Records */
type InputMapping = Record<InputContext, Partial<Record<Action, Binding[]>>>;

export class InputManager {
  private keyboard: KeyboardHandler;
  private gamepads: GamepadHandler;
  private mapping: InputMapping;
  private inputContext: InputContext = 'menu';

  constructor() {
    this.keyboard = new KeyboardHandler();
    this.gamepads = new GamepadHandler();
    this.mapping = defaultMapping as InputMapping;
  }

  public setInputContext(context: InputContext) {
    this.inputContext = context;
  }

  public update() {
    const keyboardState = this.keyboard.getState();
    const gamepadsState = this.gamepads.getState();
    return this.resolveActions(keyboardState, gamepadsState);
  }

  private resolveActions(keyboard, gamepads) {
    const actions: Record<string, Array<Action>> = {};
    const currentMapping = this.mapping[this.inputContext];

    for (const action in currentMapping) {
      const binds: Binding[] = currentMapping[action];

      for (const bind of binds) {
        if (keyboard && keyboard[bind.code] && bind.device === 'keyboard') {
          if (!actions['keyboard']) actions['keyboard'] = [];
          actions['keyboard'].push(action);
        }

        if (gamepads) {
          for (const gamepad of gamepads) {
            const type: string = gamepad.type;
            const padNumber = gamepad.padNumber;
            const buttonName = bind[type] ?? bind['generic'];
            //console.log('Checking gamepad button:', gamepad, type);
            if (!actions[`G${padNumber}`]) actions[`G${padNumber}`] = [];
            if (gamepad.buttons[buttonName]?.pressed)
              actions[`G${padNumber}`].push(action);
          }
        }
      }
    }
    return actions;
  }
}
