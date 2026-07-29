import { LoginForm } from "@/features/auth";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <Link
          href="/"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white font-bold dark:bg-zinc-50 dark:text-zinc-950 text-sm mb-2 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          AR
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Welcome back
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Sign in to your account to continue building.
        </p>
      </div>

      {/* Login Form Feature */}
      <LoginForm />
    </div>
  );
}
