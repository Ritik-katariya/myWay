"use server";

import connectToDatabase from "@/lib/mongodb";
import Hero from "@/models/Hero";

export async function getHero() {
  try {
    await connectToDatabase();
    const hero = await Hero.findOne();
    return { success: true, data: hero };
  } catch (error: any) {
    console.error("[server][hero][get]", error);
    return { success: false, error: error.message || "Failed to fetch hero" };
  }
}

export async function createHero(payload: any) {
  try {
    await connectToDatabase();
    const created = await Hero.create(payload);
    return {
      success: true,
      data: created,
      message: "Hero created successfully",
    };
  } catch (error: any) {
    console.error("[server][hero][create]", error);
    return { success: false, error: error.message || "Failed to create hero" };
  }
}

export async function updateHero(payload: any) {
  try {
    await connectToDatabase();
    const { _id, ...update } = payload || {};
    let updated;
    if (_id) {
      updated = await Hero.findByIdAndUpdate(_id, update, {
        new: true,
        runValidators: true,
      });
    } else {
      updated = await Hero.findOneAndUpdate({}, update, {
        new: true,
        upsert: true,
        runValidators: true,
      });
    }
    return {
      success: true,
      data: updated,
      message: "Hero updated successfully",
    };
  } catch (error: any) {
    console.error("[server][hero][update]", error);
    return { success: false, error: error.message || "Failed to update hero" };
  }
}
