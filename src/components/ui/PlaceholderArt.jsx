/**
 * Low-contrast wireframe sketches shown when an image is missing, so the
 * layout never shows a broken image.
 */
const sketches = {
  screen: (
    <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="30" height="100" className="ph-fill" />
      <rect x="6" y="8" width="16" height="3" rx="1" className="ph-ink" />
      <rect x="6" y="20" width="18" height="2" rx="1" className="ph-ink-soft" />
      <rect x="6" y="27" width="14" height="2" rx="1" className="ph-ink-soft" />
      <rect x="6" y="34" width="16" height="2" rx="1" className="ph-ink-soft" />
      <rect x="38" y="8" width="44" height="4" rx="1" className="ph-ink" />
      <rect x="38" y="20" width="36" height="18" rx="1.5" className="ph-stroke" />
      <rect x="78" y="20" width="36" height="18" rx="1.5" className="ph-stroke" />
      <rect x="118" y="20" width="36" height="18" rx="1.5" className="ph-stroke" />
      <rect x="38" y="44" width="76" height="48" rx="1.5" className="ph-stroke" />
      <polyline points="44,82 56,72 66,76 78,60 90,66 104,52" className="ph-line" />
      <rect x="118" y="44" width="36" height="48" rx="1.5" className="ph-stroke" />
      <circle cx="136" cy="62" r="9" className="ph-line" />
      <rect x="124" y="78" width="24" height="2" rx="1" className="ph-ink-soft" />
      <rect x="124" y="84" width="18" height="2" rx="1" className="ph-ink-soft" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 60 120" preserveAspectRatio="xMidYMid meet">
      <rect x="8" y="12" width="26" height="4" rx="1" className="ph-ink" />
      <rect x="8" y="24" width="44" height="22" rx="2" className="ph-stroke" />
      <rect x="8" y="52" width="44" height="12" rx="2" className="ph-fill" />
      <rect x="8" y="68" width="44" height="12" rx="2" className="ph-fill" />
      <rect x="8" y="84" width="44" height="12" rx="2" className="ph-fill" />
      <rect x="8" y="104" width="44" height="6" rx="1" className="ph-ink-soft" />
    </svg>
  ),
  thumbnail: (
    <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
      <rect x="20" y="16" width="120" height="68" rx="2" className="ph-stroke" />
      <circle cx="56" cy="40" r="7" className="ph-line" />
      <path d="M28 76 62 52l18 13 18-17 34 28" className="ph-line" />
    </svg>
  ),
}

export default function PlaceholderArt({ variant }) {
  return <div className="placeholder-art" aria-hidden="true">{sketches[variant] ?? sketches.thumbnail}</div>
}
