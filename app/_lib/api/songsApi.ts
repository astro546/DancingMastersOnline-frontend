import { Style } from '../game/types';
import { useEffect } from 'react';

export async function fetchSongs(style: Style = 'single') {
  try {
    const response = await fetch(`/api/songs?style=${style}`);
    if (!response.ok) throw new Error('Failed to fetch songs');
    const data = await response.json();
    console.log('Fetched songs:', data);
    return data;
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}
