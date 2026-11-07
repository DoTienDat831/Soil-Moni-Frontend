export default function SoilChart({ variant = "overview", compact = false }) {
  const paths = {
    overview: "M0 94 C45 94 56 89 88 85 S145 87 176 80 S228 72 258 75 S309 82 342 75 S397 65 427 67 S479 61 514 58 S570 50 640 48",
    ph: "M0 83 C45 83 60 70 100 70 S150 62 190 64 S240 86 280 82 S320 95 360 95 S420 95 455 88 S500 82 540 70 S600 68 640 68",
    moisture: "M0 45 C55 45 60 55 110 55 S170 70 220 70 S280 78 330 78 S365 58 410 60 S490 60 520 60 S575 45 610 45 S625 40 640 40",
    temp: "M0 70 C45 70 55 50 100 50 S160 70 200 70 S250 90 300 90 S350 94 400 94 S460 94 500 88 S560 88 590 74 S620 70 640 70",
    npk: "M0 45 C100 43 150 45 220 45 S300 47 380 46 S470 47 540 47 S600 46 640 45",
  };

  const path = paths[variant] || paths.overview;
  const gradientId = `area-${variant}-${compact ? "compact" : "regular"}`;
  const endpointY =
    variant === "overview" ? 48 :
    variant === "ph" ? 68 :
    variant === "moisture" ? 40 :
    variant === "temp" ? 70 : 45;

  return (
    <svg
      className={`trend-chart ${compact ? "trend-chart-compact" : ""}`}
      viewBox="0 0 640 130"
      preserveAspectRatio="none"
      role="img"
      aria-label="Soil readings trend chart"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3c956c" stopOpacity=".15" />
          <stop offset="100%" stopColor="#3c956c" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[20, 55, 90, 120].map((y) => (
        <line key={y} x1="0" x2="640" y1={y} y2={y} className="chart-grid" />
      ))}

      <path d={`${path} L640 125 L0 125 Z`} fill={`url(#${gradientId})`} />
      <path d={path} className="chart-line" />

      {variant === "npk" && (
        <>
          <path d="M0 83 C80 81 130 82 210 84 S330 87 410 86 S540 88 640 84" className="chart-line chart-line-secondary" />
          <path d="M0 112 C80 111 140 110 220 112 S340 116 420 114 S550 115 640 112" className="chart-line chart-line-tertiary" />
        </>
      )}

      <circle cx="640" cy={endpointY} r="3.4" className="chart-endpoint" />
    </svg>
  );
}
