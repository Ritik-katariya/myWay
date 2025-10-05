import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const testimonials = await Testimonial.find()
      .sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: testimonials,
      count: testimonials.length
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    if (!body.name || !body.designation || !body.quote || !body.image) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, designation, quote, and image' },
        { status: 400 }
      );
    }
    
    const testimonial = new Testimonial(body);
    await testimonial.save();
    
    return NextResponse.json({
      success: true,
      data: testimonial,
      message: 'Testimonial created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
