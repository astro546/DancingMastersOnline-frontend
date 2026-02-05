export class GamepadHandler {
  private PS_BUTTON_MAP: Record<number, string> = {
    0: 'X',
    1: 'CIRCLE',
    2: 'SQUARE',
    3: 'TRIANGLE',
    4: 'L1',
    5: 'R1',
    6: 'L2',
    7: 'R2',
    8: 'SHARE',
    9: 'OPTIONS',
    10: 'L3',
    11: 'R3',
    12: 'DPAD_UP',
    13: 'DPAD_DOWN',
    14: 'DPAD_LEFT',
    15: 'DPAD_RIGHT',
    16: 'PS_BUTTON',
    17: 'TOUCHPAD',
  };

  private XBOX_BUTTON_MAP: Record<number, string> = {
    0: 'A',
    1: 'B',
    2: 'X',
    3: 'Y',
    4: 'LB',
    5: 'RB',
    6: 'LT',
    7: 'RT',
    8: 'VIEW',
    9: 'MENU',
    10: 'L3',
    11: 'R3',
    12: 'DPAD_UP',
    13: 'DPAD_DOWN',
    14: 'DPAD_LEFT',
    15: 'DPAD_RIGHT',
    16: 'XBOX_BUTTON',
  };

  private SWITCH_PRO_MAP: Record<number, string> = {
    0: 'B',
    1: 'A',
    2: 'Y',
    3: 'X',
    4: 'L',
    5: 'R',
    6: 'ZL',
    7: 'ZR',
    8: 'MINUS',
    9: 'PLUS',
    10: 'L_STICK',
    11: 'R_STICK',
    12: 'DPAD_UP',
    13: 'DPAD_DOWN',
    14: 'DPAD_LEFT',
    15: 'DPAD_RIGHT',
    16: 'HOME',
    17: 'CAPTURE',
  };

  private JOYCON_L_MAP: Record<number, string> = {
    0: 'STICK_LEFT',
    1: 'STICK_DOWN',
    2: 'STICK_UP',
    3: 'STICK_RIGHT',
    4: 'SL',
    5: 'SR',
    8: 'MINUS',
    10: 'L_STICK',
    12: 'DPAD_UP',
    13: 'DPAD_DOWN',
    14: 'DPAD_LEFT',
    15: 'DPAD_RIGHT',
  };

  private JOYCON_R_MAP: Record<number, string> = {
    0: 'A',
    1: 'X',
    2: 'B',
    3: 'Y',
    4: 'SL',
    5: 'SR',
    9: 'PLUS',
    11: 'R_STICK',
    12: 'DPAD_UP',
    13: 'DPAD_DOWN',
    14: 'DPAD_LEFT',
    15: 'DPAD_RIGHT',
    16: 'HOME',
  };

  private GENERIC_MAP: Record<number, string> = {
    0: 'A',
    1: 'B',
    2: 'X',
    3: 'Y',
    4: 'LB',
    5: 'RB',
    6: 'LT',
    7: 'RT',
    8: 'BACK',
    9: 'START',
    10: 'L_STICK',
    11: 'R_STICK',
    12: 'DPAD_UP',
    13: 'DPAD_DOWN',
    14: 'DPAD_LEFT',
    15: 'DPAD_RIGHT',
    16: 'GUIDE',
  };

  public getState() {
    const pads = navigator.getGamepads();

    // Filtrar gamepads conectados
    const connected = [];
    let index = 0;
    for (const pad of pads) {
      if (pad) connected.push(this.serializePad(pad, index++));
      index++;
    }

    if (connected.length === 0) {
      return null;
    }

    return connected;
  }

  private detectControllerType(id: string) {
    const lowerId = id.toLowerCase();

    if (lowerId.includes('xinput') || lowerId.includes('xbox')) return 'xbox';

    if (
      lowerId.includes('054c') ||
      lowerId.includes('wireless controller') ||
      lowerId.includes('DualSense')
    )
      return 'playstation';

    if (lowerId.includes('pro controller') || lowerId.includes('057e'))
      return 'switch';

    if (lowerId.includes('Joy-Con (L)')) return 'joycon_l';
    if (lowerId.includes('Joy-Con (R)')) return 'joycon_r';

    return 'generic';
  }

  private GAMEPAD_MAPS: Record<string, Record<number, string>> = {
    playstation: this.PS_BUTTON_MAP,
    xbox: this.XBOX_BUTTON_MAP,
    switch: this.SWITCH_PRO_MAP,
    joycon_l: this.JOYCON_L_MAP,
    joycon_r: this.JOYCON_R_MAP,
    generic: this.GENERIC_MAP,
  };

  /* REDUCE va agregando los botones al objeto (Que en este caso, el objeto es acc) */
  private serializePad(pad: Gamepad, padNumber: number) {
    const type = this.detectControllerType(pad.id);
    return {
      id: pad.id,
      padNumber,
      type,
      index: pad.index,
      buttons: pad.buttons.reduce((acc, b, i) => {
        const buttonName = this.GAMEPAD_MAPS[type][i] || `BUTTON_${i}`;
        acc[buttonName] = {
          pressed: b.pressed,
          value: b.value,
        };
        return acc;
      }, {} as Record<string, { pressed: boolean; value: number }>),
      axes: pad.axes,
    };
  }
}
