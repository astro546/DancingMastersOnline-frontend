export type Style =
  | 'dance-single'
  | 'dance-double'
  | 'dance-versus'
  | 'dance-couple'
  | 'dance-solo';
export type Mode = 'tutorial' | 'standard' | 'course' | 'endless' | 'battle';
export type gameState =
  | 'menu'
  | 'select_style'
  | 'select_mode'
  | 'select_music'
  | 'playing'
  | 'results';
