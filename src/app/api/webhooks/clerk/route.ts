import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

type ClerkWebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses?: { email_address: string }[];
    first_name?: string | null;
    last_name?: string | null;
  };
};

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CLERK_WEBHOOK_SECRET is not configured" },
      { status: 500 }
    );
  }

  const headerList = await headers();
  const svixId = headerList.get("svix-id");
  const svixTimestamp = headerList.get("svix-timestamp");
  const svixSignature = headerList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(secret);

  let event: ClerkWebhookEvent;
  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "user.created" || event.type === "user.updated") {
    const { id, email_addresses, first_name, last_name } = event.data;
    const email = email_addresses?.[0]?.email_address ?? null;
    const name = [first_name, last_name].filter(Boolean).join(" ") || null;

    const existing = await db.query.users.findFirst({ where: eq(users.clerkId, id) });
    if (existing) {
      await db.update(users).set({ email, name }).where(eq(users.clerkId, id));
    } else {
      await db.insert(users).values({ clerkId: id, email, name });
    }
  }

  if (event.type === "user.deleted") {
    await db.delete(users).where(eq(users.clerkId, event.data.id));
  }

  return NextResponse.json({ received: true });
}
