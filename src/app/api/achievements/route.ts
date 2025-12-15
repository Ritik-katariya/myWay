import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Achievement from '@/models/Achievement';

export async function GET() {
  try {
    await connectToDatabase();
    
    const achievements = await Achievement.find()
      .sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: achievements,
      count: achievements.length
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch achievements' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    if (!body.title || !body.description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title and description' },
        { status: 400 }
      );
    }
    
    const achievement = new Achievement(body);
    await achievement.save();
    
    return NextResponse.json({
      success: true,
      data: achievement,
      message: 'Achievement created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating achievement:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create achievement' },
      { status: 500 }
    );
  }
}
