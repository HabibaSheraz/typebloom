import Link from "next/link";
import { Keyboard, Sparkles, Timer } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { courses, featuredLesson } from "@/data/lessons";

export default function DashboardPage() {
  return (
    <div className="grid gap-5">
      <section className="panel p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-sm text-bloom-muted">Today&apos;s suggested lesson</p>
            <h2 className="mt-1 text-3xl font-bold">{featuredLesson.title}</h2>
            <p className="mt-3 max-w-2xl text-bloom-lavender">
              A short home-row drill focused on smooth rhythm, clean semicolons, and relaxed accuracy.
            </p>
          </div>
          <Link className="button" href="/lesson">
            <Keyboard size={18} aria-hidden="true" />
            Resume Lesson
          </Link>
        </div>
      </section>

      <section className="stat-grid">
        <StatCard label="Best WPM" value="58" detail="+6 this week" />
        <StatCard label="Average Accuracy" value="96%" detail="Goal is 97%" />
        <StatCard label="Practice Time" value="2h 18m" detail="Across 8 sessions" />
        <StatCard label="Current Streak" value="7" detail="One week blooming" />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">WPM Over Time</h2>
            <Timer className="text-bloom-rose" size={20} aria-hidden="true" />
          </div>
          <div className="grid h-52 grid-cols-7 items-end gap-3" aria-label="Weekly WPM chart">
            {[32, 35, 38, 39, 44, 51, 58].map((value, index) => (
              <div key={value} className="grid gap-2 text-center text-xs text-bloom-muted">
                <div className="rounded-t-xl bg-gradient-to-t from-bloom-pink to-bloom-purple" style={{ height: `${value * 2.4}px` }} />
                <span>Day {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel p-6">
          <div className="mb-5 flex items-center gap-2">
            <Sparkles className="text-bloom-lavender" size={20} aria-hidden="true" />
            <h2 className="text-xl font-bold">Weak Keys</h2>
          </div>
          <div className="grid gap-3">
            {["R", "T", ";", "K"].map((key, index) => (
              <div key={key} className="flex items-center justify-between rounded-xl bg-bloom-black/40 px-4 py-3">
                <span className="font-mono text-lg text-bloom-blush">{key}</span>
                <span className="text-sm text-bloom-muted">{92 - index * 3}% accuracy</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel p-6">
        <h2 className="text-xl font-bold">Course Progress</h2>
        <div className="mt-5 grid gap-3">
          {courses.slice(0, 3).map((course) => (
            <div key={course.id} className="grid gap-2">
              <div className="flex justify-between text-sm">
                <span>{course.title}</span>
                <span className="text-bloom-muted">{course.progressPercent}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${course.progressPercent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
