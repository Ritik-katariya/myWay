import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase, checkDatabaseStatus } from '@/lib/seedData';

// GET /api/seed - Check database status
export async function GET(request: NextRequest) {
  try {
    const status = await checkDatabaseStatus();
    
    return NextResponse.json({
      success: true,
      data: status
    });
  } catch (error) {
    console.error('Error checking database status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check database status' },
      { status: 500 }
    );
  }
}

// POST /api/seed - Seed the database
export async function POST(request: NextRequest) {
  try {
    const result = await seedDatabase();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        data: result.counts
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
