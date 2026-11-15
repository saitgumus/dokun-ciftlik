interface StartGateProps {
  brand: string
  tagline: string
  startLabel: string
  hint: string
  onStart: () => void
}

export function StartGate({ brand, tagline, startLabel, hint, onStart }: StartGateProps) {
  return (
    <div className="start-gate">
      <div className="start-gate__atmosphere" aria-hidden="true" />
      <div className="start-gate__content">
        <p className="brand-mark">{brand}</p>
        <p className="brand-tagline">{tagline}</p>
        <button type="button" className="start-btn" onClick={onStart}>
          {startLabel}
        </button>
        <p className="start-hint">{hint}</p>
      </div>
    </div>
  )
}
