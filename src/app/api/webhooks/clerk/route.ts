export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req: Request) {
  // Ensure secret is present
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    console.error("CLERK_WEBHOOK_SECRET missing");
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  // Use RAW body for Svix verification
  const payload = await req.text();
  const hdrs = await headers();

  const svixId = hdrs.get("svix-id");
  const svixTimestamp = hdrs.get("svix-timestamp");
  const svixSignature = hdrs.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse("Missing Svix headers", { status: 400 });
  }

  let event: { type: string; data: any };
  try {
    const wh = new Webhook(secret);
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as any;
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    // Log more details for debugging
    if (err instanceof Error) {
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
    }
    return new NextResponse(
      JSON.stringify({
        error: "Error verifying webhook",
        message: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Connect to database after verifying webhook
  await connectToDatabase();

  const { type, data } = event;

  try {
    if (type === "user.created") {
      // Get primary email address
      const primaryEmail =
        data.email_addresses?.find(
          (e: any) => e.id === data.primary_email_address_id
        )?.email_address ||
        data.email_addresses?.[0]?.email_address ||
        "";

      // Construct name from first and last name
      const name =
        [data.first_name, data.last_name].filter(Boolean).join(" ") ||
        data.username ||
        primaryEmail.split("@")[0];

      // Generate base username
      const baseUsername = (
        data.username ||
        primaryEmail.split("@")[0] ||
        "user"
      )
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "");

      // Helper function to generate unique username
      async function generateUniqueUsername(candidate: string) {
        let suffix = 0;
        let base = candidate || "user";
        if (base.length < 4) base = (base + "user").slice(0, 4);

        for (let i = 0; i < 20; i++) {
          const attempt = suffix ? `${base}${suffix}` : base;
          const exists = await User.exists({ username: attempt });
          if (!exists) return attempt;
          suffix++;
        }
        return `${base}${Date.now().toString().slice(-4)}`;
      }

      const username = await generateUniqueUsername(baseUsername);

      // Create user in MongoDB
      await User.create({
        clerkUserId: data.id,
        email: primaryEmail,
        name,
        username,
        avatar: data.image_url || undefined,
        // Add any additional metadata from public_metadata if needed
        // role: data.public_metadata?.role || "USER",
      });

      console.log(`✅ User created: ${username} (${primaryEmail})`);
    }

    if (type === "user.deleted") {
      // Delete user from MongoDB
      const deletedUser = await User.findOneAndDelete({
        clerkUserId: data.id,
      });

      if (deletedUser) {
        console.log(`✅ User deleted: ${deletedUser.username}`);
      } else {
        console.warn(`⚠️ User not found for deletion: ${data.id}`);
      }
    }

    if (type === "user.updated") {
      // Get primary email address
      const primaryEmail =
        data.email_addresses?.find(
          (e: any) => e.id === data.primary_email_address_id
        )?.email_address ||
        data.email_addresses?.[0]?.email_address ||
        "";

      // Construct name from first and last name
      const name =
        [data.first_name, data.last_name].filter(Boolean).join(" ") ||
        data.username ||
        primaryEmail.split("@")[0];

      // Find and update user
      const existingUser = await User.findOne({ clerkUserId: data.id });

      if (existingUser) {
        if (name) existingUser.name = name;
        if (primaryEmail) existingUser.email = primaryEmail;
        if (data.image_url) existingUser.avatar = data.image_url;
        // Update any additional metadata if needed
        // if (data.public_metadata?.role) existingUser.role = data.public_metadata.role;

        await existingUser.save();
        console.log(`✅ User updated: ${existingUser.username}`);
      } else {
        console.warn(`⚠️ User not found for update: ${data.id}`);
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Webhook processed successfully",
    });
  } catch (err) {
    console.error("Error processing webhook:", err);
    // Log more details for debugging
    if (err instanceof Error) {
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
    }
    return new NextResponse(
      JSON.stringify({
        error: "Error processing webhook",
        message: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
