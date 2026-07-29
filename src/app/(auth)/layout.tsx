import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative ambient background blobs */}
      <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-zinc-200/50 blur-3xl dark:bg-zinc-900/30 -z-10" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-zinc-300/40 blur-3xl dark:bg-zinc-800/20 -z-10" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      <main className="w-full max-w-md relative z-10">
        <div className="rounded-3xl border border-zinc-200 bg-white/70 backdrop-blur-md p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
