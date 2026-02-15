import { Style } from '../game/types';
import { useEffect } from 'react';

export async function fetchSongs(style: Style = 'dance-single') {
  try {
    const response = await fetch(`/api/songs?style=${style}`);
    if (!response.ok) throw new Error('Failed to fetch songs');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}
