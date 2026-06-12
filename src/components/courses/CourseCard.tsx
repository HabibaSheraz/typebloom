import type { Course } from "@/types/domain";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-bloom-muted">Course {course.order}</p>
          <h2 className="mt-1 text-xl font-bold">{course.title}</h2>
        </div>
        <span className="rounded-full bg-bloom-pink/15 px-3 py-1 text-sm text-bloom-blush">
          {course.isUnlocked ? "Open" : "Locked"}
        </span>
      </div>
      <p className="mt-3 min-h-12 text-sm leading-6 text-bloom-lavender">{course.description}</p>
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm text-bloom-muted">
          <span>Mastery</span>
          <span>{course.progressPercent}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${course.progressPercent}%` }} />
        </div>
      </div>
    </article>
  );
}
