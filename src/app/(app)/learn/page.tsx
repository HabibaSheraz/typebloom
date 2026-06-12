import Link from "next/link";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/data/lessons";

export default function LearnPage() {
  return (
    <div className="grid gap-5">
      <section className="panel p-6">
        <p className="text-sm text-bloom-muted">Structured curriculum</p>
        <h1 className="mt-1 text-3xl font-bold">Learn touch typing in gentle, measurable steps.</h1>
        <p className="mt-3 max-w-3xl text-bloom-lavender">
          The full curriculum spans foundations, rows, punctuation, symbols, speed, accuracy, code, and numeric keypad practice.
        </p>
        <Link href="/lesson" className="button mt-5">
          Start Current Lesson
        </Link>
      </section>
      <section className="course-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section>
    </div>
  );
}
