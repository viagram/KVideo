import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';  
export const runtime = 'edge' ;

// 自动读取环境变量中的 UPSTASH_REDIS_REST_URL 和 UPSTASH_REDIS_REST_TOKEN
const redis = Redis.fromEnv();

export async function GET(request: NextRequest) {
  const profileId = request.headers.get('x-profile-id');
  
  if (!profileId) {
    return NextResponse.json({ error: 'Missing profileId' }, { status: 400 });
  }

  try {
    // 从 Upstash 读取该用户的同步数据
    const data = await redis.get(`user:sync:${profileId}`);
    
    return NextResponse.json({ 
      success: true, 
      data: data || { history: [], favorites: [] } 
    });
  } catch (error) {
    console.error('Redis Get Error:', error);
    return NextResponse.json({ error: 'Failed to fetch sync data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const profileId = request.headers.get('x-profile-id');
  
  if (!profileId) {
    return NextResponse.json({ error: 'Missing profileId' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { history, favorites } = body;

    // 将数据存入 Upstash，永久保存或你可以加过期时间 (比如 { ex: 2592000 } 存30天)
    await redis.set(`user:sync:${profileId}`, { history, favorites });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Redis Set Error:', error);
    return NextResponse.json({ error: 'Failed to save sync data' }, { status: 500 });
  }
}
