import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Timeline from '@/models/Timeline';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const timeline = await Timeline.find()
      .sort({ order: 1, date: -1, createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: timeline,
      count: timeline.length
    });
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch timeline' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title and content' },
        { status: 400 }
      );
    }
    
    const timeline = new Timeline(body);
    await timeline.save();
    
    return NextResponse.json({
      success: true,
      data: timeline,
      message: 'Timeline entry created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating timeline entry:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create timeline entry' },
      { status: 500 }
    );
  }
}
