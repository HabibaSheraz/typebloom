export default function SettingsPage() {
  const settings = [
    ["Keyboard layout", "QWERTY"],
    ["Virtual keyboard", "Visible"],
    ["Backspace", "Allowed"],
    ["Stop on error", "Off"],
    ["Sound effects", "Muted"],
    ["Exercise text size", "Comfortable"]
  ];

  return (
    <section className="panel p-6">
      <p className="text-sm text-bloom-muted">Settings</p>
      <h1 className="mt-1 text-3xl font-bold">Practice controls</h1>
      <div className="mt-6 grid gap-3">
        {settings.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between rounded-xl bg-bloom-black/40 px-4 py-3">
            <span>{label}</span>
            <span className="text-bloom-blush">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
