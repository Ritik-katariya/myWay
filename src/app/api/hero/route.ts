import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Hero from "@/models/Hero";

export async function GET() {
  try {
    await connectToDatabase();
    const hero = await Hero.findOne();
    return NextResponse.json({ success: true, data: hero || null });
  } catch (error: any) {
    console.error("[API][HERO][GET]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch hero" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const created = await Hero.create(body);
    return NextResponse.json({ success: true, data: created });
  } catch (error: any) {
    console.error("[API][HERO][POST]", error);
    const status = error?.name === "ValidationError" ? 400 : 500;
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create hero" },
      { status }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { _id, ...update } = body || {};
    let updated;
    if (_id) {
      updated = await Hero.findByIdAndUpdate(_id, update, {
        new: true,
        runValidators: true,
      });
    } else {
      // if no id provided, upsert the single hero document
      updated = await Hero.findOneAndUpdate({}, update, {
        new: true,
        upsert: true,
        runValidators: true,
      });
    }
    return NextResponse.json({ success: true, data: updated });

  } catch (error: any) {
    console.error("[API][HERO][PUT]", error);
    const status = error?.name === "ValidationError" ? 400 : 500;
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update hero" },
      { status }
    );
  }
}
