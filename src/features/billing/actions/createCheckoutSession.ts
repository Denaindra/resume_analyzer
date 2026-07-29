"use server";

import { getSessionUser } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createCheckoutSession(planId: string): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  const user = await getSessionUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const db = readDb();
  const dbUserIndex = db.users.findIndex((u) => u.id === user.id);

  if (dbUserIndex !== -1) {
    db.users[dbUserIndex].subscription = planId === "pro" ? "Pro" : "Free";
    writeDb(db);
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/billing");

  return {
    success: true,
    url: `/dashboard?checkout=success&plan=${planId}`,
  };
}
