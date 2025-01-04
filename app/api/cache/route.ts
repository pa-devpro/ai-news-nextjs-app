import { NextResponse } from 'next/server';
import cache from '../../../lib/cache';

export async function GET() {
  const cacheContents = cache.getAll();
  console.log('Cache contents inside ROUTE:', cacheContents); // Add logging to verify

  return NextResponse.json({ cache: cacheContents });
}