interface StatCardProps {
  label: string;
  value: string;
  detail: string;
}

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <article className="panel metric">
      <p className="text-sm text-bloom-muted">{label}</p>
      <strong>{value}</strong>
      <p className="mt-2 text-sm text-bloom-lavender">{detail}</p>
    </article>
  );
}
