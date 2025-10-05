import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Skill from '@/models/Skill';

// GET /api/skills/[id] - Get a specific skill category
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const skill = await Skill.findById(params.id);
    
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: skill
    });
  } catch (error) {
    console.error('Error fetching skill:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skill category' },
      { status: 500 }
    );
  }
}

// PUT /api/skills/[id] - Update a skill category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    const skill = await Skill.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: skill,
      message: 'Skill category updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating skill:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update skill category' },
      { status: 500 }
    );
  }
}

// DELETE /api/skills/[id] - Delete a skill category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const skill = await Skill.findByIdAndDelete(params.id);
    
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Skill category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete skill category' },
      { status: 500 }
    );
  }
}
