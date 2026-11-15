import type { Mode } from '../types'

interface ModeBarProps {
  mode: Mode
  exploreLabel: string
  findLabel: string
  replayLabel: string
  showReplay: boolean
  promptLabel: string | null
  feedbackLabel: string | null
  onMode: (mode: Mode) => void
  onReplay: () => void
}

export function ModeBar({
  mode,
  exploreLabel,
  findLabel,
  replayLabel,
  showReplay,
  promptLabel,
  feedbackLabel,
  onMode,
  onReplay,
}: ModeBarProps) {
  return (
    <header className="top-bar">
      <div className="mode-switch" role="tablist" aria-label="Mod">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'kesfet'}
          className={mode === 'kesfet' ? 'is-on' : ''}
          onClick={() => onMode('kesfet')}
        >
          {exploreLabel}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'bul'}
          className={mode === 'bul' ? 'is-on' : ''}
          onClick={() => onMode('bul')}
        >
          {findLabel}
        </button>
      </div>

      <div className="status-line" aria-live="polite">
        {feedbackLabel ? (
          <span className="status-feedback">{feedbackLabel}</span>
        ) : promptLabel ? (
          <span className="status-prompt">{promptLabel}</span>
        ) : (
          <span className="status-idle">Hayvana dokun</span>
        )}
        {showReplay && (
          <button type="button" className="replay-btn" onClick={onReplay}>
            {replayLabel}
          </button>
        )}
      </div>
    </header>
  )
}
