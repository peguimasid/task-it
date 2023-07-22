import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return NextResponse.json({ coming_from_api: await request.json() });
}
