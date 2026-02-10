export type Style = 'single' | 'double' | 'versus' | 'solo';
export type Mode = 'tutorial' | 'standard' | 'course' | 'endless' | 'battle';
export type gameState =
  | 'menu'
  | 'select_style'
  | 'select_mode'
  | 'select_music'
  | 'playing'
  | 'results';
