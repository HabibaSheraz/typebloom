import Link from "next/link";
import { Keyboard, Sparkles, Timer } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen px-6 py-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="logo-mark">T</span>
          <span>
            <strong className="block">TypeBloom</strong>
            <small className="text-bloom-muted">Learn faster. Type beautifully.</small>
          </span>
        </Link>
        <Link className="button" href="/dashboard">
          Open App
        </Link>
      </nav>
      <section className="mx-auto grid min-h-[calc(100vh-110px)] max-w-6xl items-center gap-10 py-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-bloom-lavender/20 px-4 py-2 text-sm text-bloom-blush">
            Premium typing tutor for calm speed and beautiful accuracy
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-tight md:text-7xl">
            TypeBloom
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-bloom-lavender">
            Build speed, accuracy, and confidence one beautiful keystroke at a time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="button" href="/lesson">
              <Keyboard size={18} aria-hidden="true" />
              Start Typing Free
            </Link>
            <Link className="button secondary" href="/typing-test">
              <Timer size={18} aria-hidden="true" />
              Try a Quick Test
            </Link>
          </div>
        </div>
        <div className="panel p-5">
          <div className="rounded-2xl bg-bloom-black/60 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-bloom-blush">Home Row Rhythm</span>
              <Sparkles className="text-bloom-lavender" size={18} aria-hidden="true" />
            </div>
            <div className="typing-text min-h-0 text-2xl">
              <span className="char correct">soft keys bloom</span>{" "}
              <span className="char current">a</span>
              <span className="char">s steady hands learn calm speed</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {["42 WPM", "97% Accuracy", "12m today"].map((item) => (
                <div key={item} className="rounded-xl border border-bloom-lavender/20 bg-bloom-surface/80 p-4 text-center text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
