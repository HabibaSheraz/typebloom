import Link from "next/link";

export default function TypingTestPage() {
  return (
    <section className="panel p-6">
      <p className="text-sm text-bloom-muted">Typing Test</p>
      <h1 className="mt-1 text-3xl font-bold">Quick tests are ready for the next phase.</h1>
      <p className="mt-3 max-w-2xl text-bloom-lavender">
        The routing, settings surface, and result model are in place. The current implemented typing experience lives in the lesson screen.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {["15 sec", "30 sec", "1 min", "2 min", "5 min"].map((duration) => (
          <button key={duration} className="button secondary" type="button" aria-disabled="true">
            {duration}
          </button>
        ))}
      </div>
      <Link href="/lesson" className="button mt-6">
        Use Lesson Engine
      </Link>
    </section>
  );
}
