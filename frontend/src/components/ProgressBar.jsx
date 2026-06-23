export default function ProgressBar({ total, done, theme }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div style={{ height: 2, background: theme.border, borderRadius: 2, marginBottom: "2.5rem" }}>
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: theme.accent,
          borderRadius: 2,
          transition: "width 0.5s ease",
        }}
      />
    </div>
  );
}