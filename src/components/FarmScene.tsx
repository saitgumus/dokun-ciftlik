import type { AnimalId } from '../types'

interface FarmSceneProps {
  activeId: AnimalId | null
  highlightId: AnimalId | null
  onAnimalTap: (id: AnimalId) => void
}

export function FarmScene({ activeId, highlightId, onAnimalTap }: FarmSceneProps) {
  const cls = (id: AnimalId) =>
    [
      'animal',
      activeId === id ? 'is-active' : '',
      highlightId === id ? 'is-highlight' : '',
    ]
      .filter(Boolean)
      .join(' ')

  return (
    <svg
      className="farm-scene"
      viewBox="0 0 800 560"
      role="img"
      aria-label="Çiftlik sahnesi"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9fd4ea" />
          <stop offset="55%" stopColor="#c5e6f5" />
          <stop offset="100%" stopColor="#e8f2c8" />
        </linearGradient>
        <linearGradient id="hillFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fc46a" />
          <stop offset="100%" stopColor="#5f9a48" />
        </linearGradient>
        <linearGradient id="hillBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8d47e" />
          <stop offset="100%" stopColor="#7bb35a" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffe08a" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#ffd15c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffd15c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Atmosphere */}
      <rect width="800" height="560" fill="url(#sky)" />
      <circle className="sun" cx="680" cy="90" r="70" fill="url(#sunGlow)" />
      <circle cx="680" cy="90" r="28" fill="#f6d56a" />

      {/* Soft clouds */}
      <g className="cloud cloud-a" fill="#fff" opacity="0.55">
        <ellipse cx="140" cy="70" rx="48" ry="22" />
        <ellipse cx="175" cy="64" rx="32" ry="20" />
        <ellipse cx="110" cy="68" rx="28" ry="16" />
      </g>
      <g className="cloud cloud-b" fill="#fff" opacity="0.4">
        <ellipse cx="420" cy="110" rx="56" ry="20" />
        <ellipse cx="460" cy="104" rx="30" ry="16" />
      </g>

      {/* Distant hills */}
      <path
        d="M0 280 C120 230 220 250 320 270 C420 290 520 230 650 255 C720 268 770 250 800 260 L800 560 L0 560 Z"
        fill="url(#hillBack)"
      />
      <path
        d="M0 340 C90 300 180 320 280 345 C400 375 500 310 620 335 C700 350 760 330 800 340 L800 560 L0 560 Z"
        fill="url(#hillFront)"
      />

      {/* Barn */}
      <g className="barn" aria-hidden="true">
        <path d="M520 250 L610 190 L700 250 Z" fill="#c45c4a" />
        <rect x="535" y="250" width="150" height="100" fill="#d9785f" />
        <rect x="590" y="280" width="40" height="70" fill="#6b3a2e" />
        <rect x="555" y="265" width="28" height="28" fill="#8ec8e0" opacity="0.85" />
        <rect x="637" y="265" width="28" height="28" fill="#8ec8e0" opacity="0.85" />
      </g>

      {/* Tree */}
      <g className="tree" aria-hidden="true">
        <rect x="118" y="300" width="18" height="70" rx="4" fill="#7a5336" />
        <circle cx="127" cy="275" r="42" fill="#4f8f3e" />
        <circle cx="100" cy="290" r="28" fill="#5aa048" />
        <circle cx="155" cy="292" r="30" fill="#5aa048" />
      </g>

      {/* Coop */}
      <g className="coop" aria-hidden="true">
        <path d="M640 380 L690 345 L740 380 Z" fill="#b8894a" />
        <rect x="650" y="380" width="80" height="50" fill="#d4a65a" />
        <rect x="678" y="395" width="24" height="35" fill="#6b3a2e" />
      </g>

      {/* Pond */}
      <ellipse cx="160" cy="460" rx="70" ry="28" fill="#6eb6d4" opacity="0.75" />
      <ellipse cx="160" cy="455" rx="50" ry="14" fill="#9ad0e4" opacity="0.5" />

      {/* Fence accents */}
      <g stroke="#8b6a3e" strokeWidth="4" fill="none" opacity="0.55">
        <path d="M280 420 H470" />
        <path d="M300 405 V435" />
        <path d="M340 405 V435" />
        <path d="M380 405 V435" />
        <path d="M420 405 V435" />
        <path d="M450 405 V435" />
      </g>

      {/* —— Animals (large tap targets) —— */}

      {/* İnek — left-center meadow */}
      <g
        className={cls('inek')}
        role="button"
        tabIndex={0}
        aria-label="İnek"
        onClick={() => onAnimalTap('inek')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onAnimalTap('inek')
          }
        }}
        transform="translate(250 330)"
      >
        <circle className="hit" cx="55" cy="45" r="58" />
        <ellipse cx="55" cy="52" rx="48" ry="32" fill="#f0ebe0" />
        <ellipse cx="30" cy="48" rx="14" ry="16" fill="#3d3a36" />
        <ellipse cx="70" cy="58" rx="12" ry="14" fill="#3d3a36" />
        <ellipse cx="95" cy="42" rx="18" ry="16" fill="#f0ebe0" />
        <ellipse cx="108" cy="44" rx="10" ry="8" fill="#e8b4a8" />
        <circle cx="100" cy="38" r="2.5" fill="#2c3a2e" />
        <rect x="28" y="75" width="10" height="22" rx="3" fill="#f0ebe0" />
        <rect x="48" y="78" width="10" height="20" rx="3" fill="#f0ebe0" />
        <rect x="68" y="78" width="10" height="20" rx="3" fill="#3d3a36" />
        <rect x="86" y="75" width="10" height="22" rx="3" fill="#f0ebe0" />
      </g>

      {/* Koyun — by the tree */}
      <g
        className={cls('koyun')}
        role="button"
        tabIndex={0}
        aria-label="Koyun"
        onClick={() => onAnimalTap('koyun')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onAnimalTap('koyun')
          }
        }}
        transform="translate(95 340)"
      >
        <circle className="hit" cx="40" cy="40" r="52" />
        <ellipse cx="40" cy="48" rx="36" ry="28" fill="#f7f4ee" />
        <circle cx="22" cy="42" r="14" fill="#eee8dc" />
        <circle cx="55" cy="40" r="15" fill="#eee8dc" />
        <circle cx="40" cy="32" r="13" fill="#eee8dc" />
        <ellipse cx="68" cy="42" rx="12" ry="11" fill="#d9cfc0" />
        <circle cx="72" cy="40" r="2" fill="#2c3a2e" />
        <rect x="22" y="68" width="8" height="18" rx="2" fill="#5a5048" />
        <rect x="38" y="70" width="8" height="16" rx="2" fill="#5a5048" />
        <rect x="52" y="70" width="8" height="16" rx="2" fill="#5a5048" />
      </g>

      {/* Tavuk — by coop */}
      <g
        className={cls('tavuk')}
        role="button"
        tabIndex={0}
        aria-label="Tavuk"
        onClick={() => onAnimalTap('tavuk')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onAnimalTap('tavuk')
          }
        }}
        transform="translate(620 400)"
      >
        <circle className="hit" cx="36" cy="32" r="48" />
        <ellipse cx="36" cy="40" rx="28" ry="22" fill="#f2c14e" />
        <circle cx="58" cy="28" r="14" fill="#f2c14e" />
        <path d="M58 16 L62 8 L66 16 Z" fill="#e85d4c" />
        <path d="M50 16 L54 10 L58 16 Z" fill="#e85d4c" />
        <path d="M70 28 L82 30 L70 34 Z" fill="#f0a030" />
        <circle cx="62" cy="26" r="2" fill="#2c3a2e" />
        <path d="M28 55 L24 68 M36 58 L36 70 M44 55 L48 68" stroke="#c47a2a" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* At — right meadow */}
      <g
        className={cls('at')}
        role="button"
        tabIndex={0}
        aria-label="At"
        onClick={() => onAnimalTap('at')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onAnimalTap('at')
          }
        }}
        transform="translate(430 300)"
      >
        <circle className="hit" cx="55" cy="50" r="60" />
        <ellipse cx="48" cy="55" rx="42" ry="28" fill="#8b5a3c" />
        <ellipse cx="88" cy="38" rx="16" ry="22" fill="#8b5a3c" />
        <ellipse cx="98" cy="28" rx="12" ry="10" fill="#7a4a30" />
        <path d="M82 22 Q78 8 88 4" stroke="#5a3824" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="102" cy="26" r="2" fill="#2c3a2e" />
        <rect x="22" y="75" width="9" height="28" rx="3" fill="#6e452e" />
        <rect x="40" y="78" width="9" height="26" rx="3" fill="#6e452e" />
        <rect x="58" y="78" width="9" height="26" rx="3" fill="#6e452e" />
        <rect x="74" y="75" width="9" height="28" rx="3" fill="#6e452e" />
        <path d="M10 50 Q0 60 12 68" stroke="#5a3824" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>

      {/* Ördek — on pond */}
      <g
        className={cls('ordek')}
        role="button"
        tabIndex={0}
        aria-label="Ördek"
        onClick={() => onAnimalTap('ordek')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onAnimalTap('ordek')
          }
        }}
        transform="translate(125 420)"
      >
        <circle className="hit" cx="40" cy="28" r="46" />
        <ellipse cx="36" cy="36" rx="28" ry="16" fill="#f0c040" />
        <circle cx="58" cy="24" r="14" fill="#f0c040" />
        <ellipse cx="72" cy="26" rx="10" ry="5" fill="#e8892a" />
        <circle cx="62" cy="22" r="2" fill="#2c3a2e" />
        <path d="M20 30 Q10 20 22 18" fill="#e8a820" />
      </g>

      {/* Keçi — near fence */}
      <g
        className={cls('keci')}
        role="button"
        tabIndex={0}
        aria-label="Keçi"
        onClick={() => onAnimalTap('keci')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onAnimalTap('keci')
          }
        }}
        transform="translate(330 380)"
      >
        <circle className="hit" cx="42" cy="38" r="50" />
        <ellipse cx="40" cy="48" rx="34" ry="24" fill="#d8cfc2" />
        <ellipse cx="70" cy="36" rx="14" ry="13" fill="#cfc4b4" />
        <path d="M64 24 L58 10 M78 24 L84 10" stroke="#8a7a68" strokeWidth="3" strokeLinecap="round" />
        <circle cx="74" cy="34" r="2" fill="#2c3a2e" />
        <ellipse cx="82" cy="40" rx="6" ry="4" fill="#b8a898" />
        <rect x="22" y="66" width="8" height="20" rx="2" fill="#8a7a68" />
        <rect x="36" y="68" width="8" height="18" rx="2" fill="#8a7a68" />
        <rect x="50" y="68" width="8" height="18" rx="2" fill="#8a7a68" />
        <rect x="62" y="66" width="8" height="20" rx="2" fill="#8a7a68" />
      </g>
    </svg>
  )
}
