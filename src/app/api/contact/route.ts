import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');
    
    let query: any = {};
    
    if (status) {
      query.status = status;
    }
    
    let contacts = await Contact.find(query)
      .sort({ createdAt: -1 });
    
    if (limit) {
      contacts = contacts.slice(0, parseInt(limit));
    }
    
    return NextResponse.json({
      success: true,
      data: contacts,
      count: contacts.length
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, and message' },
        { status: 400 }
      );
    }
    
    const contact = new Contact(body);
    await contact.save();
    
    return NextResponse.json({
      success: true,
      data: contact,
      message: 'Contact message sent successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating contact:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to send contact message' },
      { status: 500 }
    );
  }
}
