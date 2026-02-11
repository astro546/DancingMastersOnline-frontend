import { Style } from '../game/types';

export async function fetchSongs(style: Style = 'single') {
  const response = await fetch(`/api/songs?style=${style}`);
  if (!response.ok) {
    throw new Error('Failed to fetch songs');
  }
  const data = await response.json();
  console.log('Fetched songs:', data);
  return data;
}
