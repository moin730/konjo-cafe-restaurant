import { cn } from "@/lib/utils";

/**
 * A horizontal band inspired by the stepped-triangle weave on a mesob basket.
 * Purely decorative.
 */
export function MesobDivider({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const a = tone === "light" ? "var(--primary)" : "var(--gold)";
  const b = tone === "light" ? "var(--espresso)" : "var(--cream)";
  const c = "var(--accent)";
  const id = `mesob-${tone}`;
  return (
    <div aria-hidden className={cn("w-full", className)}>
      <svg className="block h-5 w-full" preserveAspectRatio="none">
        <defs>
          <pattern id={id} width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 20 10 4 20 20Z" fill={a} />
            <path d="M20 20 30 4 40 20Z" fill={b} opacity=".85" />
            <path d="M10 4 20 20 30 4Z" fill={c} opacity=".5" />
            <rect y="0" width="40" height="2" fill={b} opacity=".35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

/**
 * A circular medallion of concentric triangle rings, like a mesob lid seen from above.
 */
export function MesobMedallion({
  className,
  colors = ["var(--gold)", "var(--primary)", "var(--accent)", "var(--secondary)"],
}: {
  className?: string;
  colors?: string[];
}) {
  const rings = [
    { r: 46, n: 48, h: 4 },
    { r: 39, n: 36, h: 5 },
    { r: 31, n: 28, h: 5 },
    { r: 23, n: 20, h: 5 },
    { r: 15, n: 12, h: 5 },
  ];
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      {rings.map((ring, ri) => (
        <g key={ri}>
          <circle
            cx="50"
            cy="50"
            r={ring.r + 0.6}
            fill="none"
            stroke={colors[0]}
            strokeOpacity=".5"
            strokeWidth=".3"
          />
          {Array.from({ length: ring.n }).map((_, i) => {
            const step = (Math.PI * 2) / ring.n;
            const t = i * step;
            const p = (ang: number, rad: number) =>
              `${(50 + Math.cos(ang) * rad).toFixed(2)},${(50 + Math.sin(ang) * rad).toFixed(2)}`;
            return (
              <polygon
                key={i}
                points={`${p(t, ring.r)} ${p(t + step, ring.r)} ${p(t + step / 2, ring.r - ring.h)}`}
                fill={colors[(i + ri) % colors.length]}
                opacity={i % 2 ? 0.55 : 0.9}
              />
            );
          })}
        </g>
      ))}
      <circle cx="50" cy="50" r="7" fill={colors[1]} />
      <circle cx="50" cy="50" r="3" fill={colors[0]} />
    </svg>
  );
}
