import { cookies } from "next/headers";
import { readDb, User } from "./db";

export async function getSessionUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) return null;

  const db = readDb();
  const user = db.users.find((u) => u.id === sessionToken || u.email === sessionToken);
  return user || null;
}

export async function loginUser(email: string): Promise<boolean> {
  const db = readDb();
  const user = db.users.find((u) => u.email === email);
  if (!user) return false;

  const cookieStore = await cookies();
  cookieStore.set("session_token", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return true;
}

export async function logoutUser(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
}
