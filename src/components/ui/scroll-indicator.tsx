export function ScrollIndicator() {
  return (
    <div className="scroll-indicator">
      <span
        className="font-mono text-[0.625rem] uppercase tracking-[0.15em]"
        style={{ color: "var(--text-muted)" }}
      >
        KAYDIR
      </span>
      <div className="dot" />
    </div>
  );
}
