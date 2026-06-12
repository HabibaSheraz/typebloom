"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Code2,
  Gamepad2,
  Home,
  Keyboard,
  Medal,
  Settings,
  Sparkles,
  Timer,
  Trophy,
  UserRound
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/lesson", label: "Practice Lesson", icon: Keyboard },
  { href: "/typing-test", label: "Typing Test", icon: Timer },
  { href: "/code-typing", label: "Code Typing", icon: Code2 },
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/achievements", label: "Achievements", icon: Medal },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="app-grid">
      <aside className="sidebar" aria-label="Main navigation">
        <Link href="/dashboard" className="mb-8 flex items-center gap-3">
          <span className="logo-mark">T</span>
          <span>
            <strong className="block text-lg">TypeBloom</strong>
            <small className="text-bloom-muted">Learn faster. Type beautifully.</small>
          </span>
        </Link>
        <nav className="grid gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={clsx("nav-link", isActive && "active")}>
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="main-shell">
        <header className="topbar">
          <div>
            <p className="text-sm text-bloom-muted">Guest workspace</p>
            <h1 className="text-3xl font-bold">Welcome back, Bloom</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-bloom-lavender/20 px-3 py-2 text-sm text-bloom-blush">7 day streak</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-bloom-pink/20 text-bloom-blush">
              <Sparkles size={18} aria-hidden="true" />
            </span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
