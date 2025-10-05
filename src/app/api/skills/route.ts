import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Skill from '@/models/Skill';

// GET /api/skills - Get all skills
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const skills = await Skill.find()
      .sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: skills,
      count: skills.length
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST /api/skills - Create a new skill category
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.category || !body.skills || !Array.isArray(body.skills)) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: category and skills array' },
        { status: 400 }
      );
    }
    
    const skill = new Skill(body);
    await skill.save();
    
    return NextResponse.json({
      success: true,
      data: skill,
      message: 'Skill category created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating skill:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create skill category' },
      { status: 500 }
    );
  }
}
