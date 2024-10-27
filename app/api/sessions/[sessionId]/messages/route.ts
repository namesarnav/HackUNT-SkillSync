import { NextResponse } from 'next/server';
import { Message } from '@/lib/db/models/Message';
// import { connectDB } from '@/lib/db/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    await connectDB();
    const messages = await Message.find({ sessionId: params.sessionId })
      .sort({ timestamp: 1 })
      .lean();
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const body = await request.json();
    await connectDB();
    
    const message = await Message.create({
      sessionId: params.sessionId,
      content: body.content,
      sender: body.sender,
      timestamp: new Date(),
    });
    
    return NextResponse.json(message);
  } catch (error) {
    console.error('Failed to save message:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}

function connectDB() {
    throw new Error('Function not implemented.');
}
