"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "../actions/loginAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SocialButtons } from "./social-buttons";
import { useRouter, useSearchParams } from "next/navigation";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isTimeout = searchParams.get("timeout") === "true";

  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-6">
      {isTimeout && (
        <div className="rounded-xl bg-amber-50 p-4 text-sm font-medium text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50 animate-pulse">
          Your session timed out due to inactivity. Please sign in again.
        </div>
      )}

      {state.errors?.form && (
        <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800 dark:bg-red-950/30 dark:text-red-400 border border-red-200/50 dark:border-red-900/50">
          {state.errors.form}
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="user@example.com"
          error={state.errors?.email}
          defaultValue="user@example.com"
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          error={state.errors?.password}
          defaultValue="password"
          required
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 font-medium text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            className="rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 h-4 w-4 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:ring-zinc-50"
          />
          Remember me
        </label>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
        >
          Forgot password?
        </a>
      </div>

      <Button type="submit" className="w-full" isLoading={isPending}>
        Sign In
      </Button>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
        <span className="flex-shrink mx-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Or continue with
        </span>
        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
      </div>

      <SocialButtons />
    </form>
  );
}

import { Suspense } from "react";

export function LoginForm() {
  return (
    <Suspense
      fallback={
        <div className="flex h-48 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-zinc-50" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
