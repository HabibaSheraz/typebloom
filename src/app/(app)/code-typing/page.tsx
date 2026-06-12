export default function CodeTypingPage() {
  return (
    <section className="panel p-6">
      <p className="text-sm text-bloom-muted">Code Typing</p>
      <h1 className="mt-1 text-3xl font-bold">Syntax-focused typing practice</h1>
      <pre className="mt-6 overflow-auto rounded-2xl border border-bloom-lavender/20 bg-bloom-black/60 p-5 font-mono text-sm text-bloom-lavender">
{`function bloomSpeed(words: string[]) {
  return words.filter(Boolean).join(" ");
}`}
      </pre>
    </section>
  );
}
