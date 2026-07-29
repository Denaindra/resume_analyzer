export interface LoginPayload {
  email?: string;
  password?: string;
}

export function validateLogin(payload: LoginPayload): {
  success: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!payload.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(payload.email)) {
    errors.email = "Invalid email address.";
  }

  if (!payload.password) {
    errors.password = "Password is required.";
  } else if (payload.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
}
