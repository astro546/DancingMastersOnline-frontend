import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const songs = await prisma.song.findMany();
  return NextResponse.json(songs);
}
