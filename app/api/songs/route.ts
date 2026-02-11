import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { API_URL } from '../../_lib/constants';

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${API_URL}/songs`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching songs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch songs' },
      { status: 500 },
    );
  }
}
