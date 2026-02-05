export class KeyboardHandler {
  /* Aqui definimos el tipo 'keys', los cuales son un par llave-valor.
  La llave es un string, el cual nos indica la tecla presionada (ArrowUp, ArrowDown, etc), y su valor es un booleano, que nos indica si la tecla esta presionada o no */
  private keys: Record<string, boolean> = {};

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);
    }
  }

  private onKeyDown = (e: KeyboardEvent) => {
    this.keys[e.code] = true;
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys[e.code] = false;
  };

  /** Devuelve el estado actual del teclado */
  public getState(): Record<string, boolean> {
    return this.keys;
  }
}
