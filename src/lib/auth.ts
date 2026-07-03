import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { User } from "@/db/schema";

/**
 * Returns the internal DB user for the signed-in Clerk user, creating the
 * row on first sight (lazy sync — also covered by the Clerk webhook).
 * Redirects to sign-in if no session exists.
 */
export async function getCurrentUser(): Promise<User> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const existing = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });
  if (existing) return existing;

  const clerkUser = await currentUser();
  const [created] = await db
    .insert(users)
    .values({
      clerkId: userId,
      email: clerkUser?.emailAddresses?.[0]?.emailAddress ?? null,
      name: clerkUser
        ? [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null
        : null,
    })
    .onConflictDoNothing({ target: users.clerkId })
    .returning();

  if (created) return created;

  // Race condition fallback: another request created it first.
  const fallback = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });
  if (!fallback) throw new Error("Failed to resolve user record");
  return fallback;
}
