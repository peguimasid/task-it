import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json({ coming_from_api: await request.json() });
}
