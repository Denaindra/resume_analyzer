"use server";

import { loginUser, logoutUser } from "@/lib/auth";
import { validateLogin } from "../schemas/authSchema";

export async function loginAction(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; errors?: Record<string, string> }> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const validation = validateLogin({ email, password });
  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  if (email === "user@example.com" && password === "password") {
    const ok = await loginUser(email);
    if (ok) {
      return { success: true };
    }
  }

  return {
    success: false,
    errors: {
      form: "Invalid credentials. Use user@example.com / password",
    },
  };
}

export async function logoutAction() {
  await logoutUser();
}
