/* Shared SVG icon set used throughout Soil Monitor. */
export default function Icon({ name, size = 18, strokeWidth = 1.7, className = "" }) {
  const paths = {
    sprout: ["M12 21v-8", "M12 13C5 13 4 8 4 5c5 0 8 2 8 8Z", "M12 13c0-6 3-9 8-9 0 5-2 9-8 9Z", "M5 21h14"],
    grid: ["M3.5 3.5h7v7h-7z", "M13.5 3.5h7v7h-7z", "M3.5 13.5h7v7h-7z", "M13.5 13.5h7v7h-7z"],
    chart: ["M3 3v18h18", "M7 14l4-4 4 3 6-7", "M17 6h4v4"],
    radio: ["M12 12h.01", "M8.5 8.5a5 5 0 0 0 0 7", "M15.5 8.5a5 5 0 0 1 0 7", "M5.7 5.7a9 9 0 0 0 0 12.6", "M18.3 5.7a9 9 0 0 1 0 12.6"],
    settings: ["M4 6h16", "M4 12h16", "M4 18h16", "M8 4v4", "M15 10v4", "M10 16v4"],
    bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9", "M10 21h4"],
    user: ["M20 21a8 8 0 0 0-16 0", "M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"],
    mail: ["M3 5h18v14H3z", "m3 6 9 7 9-7"],
    lock: ["M5 10h14v11H5z", "M8 10V7a4 4 0 0 1 8 0v3"],
    eye: ["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"],
    eyeOff: ["m3 3 18 18", "M10.6 10.6a2 2 0 0 0 2.8 2.8", "M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-3.1 3.8", "M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7c1.5 0 2.8-.4 4-1"],
    droplet: ["M12 2.5S5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.5 12 2.5Z"],
    flask: ["M9 3h6", "M10 3v6l-6 10a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L14 9V3", "M7 15h10"],
    thermometer: ["M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z"],
    check: ["m5 12 4 4L19 6"],
    checkCircle: ["M22 11.1V12a10 10 0 1 1-5.9-9.1", "m9 11 3 3L22 4"],
    shield: ["M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z", "m9 12 2 2 4-4"],
    wifi: ["M5 9a11 11 0 0 1 14 0", "M8 12a6.5 6.5 0 0 1 8 0", "M11 15a2 2 0 0 1 2 0", "M12 19h.01"],
    plug: ["M8 2v6", "M16 2v6", "M5 8h14v3a7 7 0 0 1-7 7v4", "M12 18v4"],
    clock: ["M12 8v4l3 2", "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"],
    refresh: ["M20 7v5h-5", "M4 17v-5h5", "M5.6 9A7 7 0 0 1 18 6l2 1", "M18.4 15A7 7 0 0 1 6 18l-2-1"],
    ruler: ["m21 8-13 13-6-6L15 2z", "m7 14 3 3", "m10 11 2 2", "m13 8 3 3"],
    leaf: ["M20 4c-8 0-14 4-14 11a5 5 0 0 0 5 5c7 0 9-8 9-16Z", "M4 21c3-5 7-8 12-11"],
    arrow: ["M5 12h14", "m13 6 6 6-6 6"],
    chevron: ["m9 18 6-6-6-6"],
    signal: ["M3 20h2v-4H3z", "M8 20h2v-7H8z", "M13 20h2V9h-2z", "M18 20h2V4h-2z"],
    info: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M12 11v6", "M12 7h.01"],
    x: ["M18 6 6 18", "m6 6 12 12"],
    menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  };
  const selected = paths[name] || paths.info;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {selected.map((d, i) => <path d={d} key={i} />)}
    </svg>
  );
}
