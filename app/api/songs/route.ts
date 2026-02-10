import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const style = searchParams.get('style') || 'single';

  const songs = await prisma.song.findMany({
    select: {
      id: true,
      title: true,
      artist: true,
      audioFile: true,
      bannerImg: true,
      sampleLength: true,
      sampleStart: true,

      charts: {
        where: {
          style,
        },
        select: {
          difficulty: true,
          level: true,
          radarAir: true,
          radarChaos: true,
          radarFreeze: true,
          radarStream: true,
          radarVoltage: true,
        },
      },
    },
  });
  return NextResponse.json(songs);
}
