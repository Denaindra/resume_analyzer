"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Layout, CreditCard, Settings, LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/features/auth/actions/loginAction";

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    subscription: "Free" | "Pro";
  } | null;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "My Resumes", href: "/dashboard", icon: FileText },
    { name: "Templates", href: "/dashboard/templates", icon: Layout, disabled: true },
    { name: "Billing & Plans", href: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, disabled: true },
  ];

  const handleLogout = async () => {
    await logoutAction();
    window.location.href = "/";
  };

  return (
    <aside className="w-64 border-r border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 flex flex-col justify-between h-screen sticky top-0">
      <div className="space-y-8">
        {/* Brand/Logo */}
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white font-bold dark:bg-zinc-50 dark:text-zinc-950">
            AR
          </div>
          <div>
            <h1 className="text-base font-semibold leading-none tracking-tight text-zinc-950 dark:text-zinc-50">
              AI Resume
            </h1>
            <span className="text-[10px] text-zinc-500 font-medium tracking-wide uppercase">
              Builder Studio
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <div key={item.name}>
                {item.disabled ? (
                  <button
                    disabled
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 cursor-not-allowed dark:text-zinc-600 opacity-60"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    <span className="ml-auto text-[9px] font-bold bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-700 px-1.5 py-0.5 rounded-md uppercase">
                      Soon
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-zinc-50 hover:text-zinc-950 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
                      isActive
                        ? "bg-zinc-900 text-zinc-50 hover:bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-50 shadow-sm"
                        : "text-zinc-600 dark:text-zinc-400"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* User Info / Logout */}
      <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        {user && (
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-zinc-950 dark:text-zinc-50 flex items-center gap-1.5">
                {user.name}
                {user.subscription === "Pro" && (
                  <span title="Pro Member">
                    <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
                  </span>
                )}
              </p>
              <p className="text-xs text-zinc-500 truncate dark:text-zinc-400">
                {user.email}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
