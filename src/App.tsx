import farm from './content/farm.json'
import { FarmScene } from './components/FarmScene'
import { ModeBar } from './components/ModeBar'
import { StartGate } from './components/StartGate'
import { useFarmGame } from './hooks/useFarmGame'
import type { FarmContent } from './types'
import './App.css'

const content = farm as FarmContent

export default function App() {
  const game = useFarmGame(content)

  if (!game.started) {
    return (
      <StartGate
        brand={content.brand}
        tagline={content.tagline}
        startLabel={content.ui.start}
        hint={content.ui.startHint}
        onStart={() => void game.start()}
      />
    )
  }

  const feedbackLabel =
    game.feedback === 'correct'
      ? content.ui.findCorrect
      : game.feedback === 'wrong'
        ? content.ui.findAgain
        : null

  const promptLabel =
    game.mode === 'bul' && game.targetName
      ? content.ui.findPrompt.replace('{name}', game.targetName)
      : null

  return (
    <div className="app-shell">
      <ModeBar
        mode={game.mode}
        exploreLabel={content.ui.modeExplore}
        findLabel={content.ui.modeFind}
        replayLabel={content.ui.replayPrompt}
        showReplay={game.mode === 'bul'}
        promptLabel={promptLabel}
        feedbackLabel={feedbackLabel}
        onMode={(m) => void game.switchMode(m)}
        onReplay={() => void game.replayPrompt()}
      />

      <main className="scene-stage">
        <p className="scene-brand" aria-hidden="true">
          {content.brand}
        </p>
        <FarmScene
          activeId={game.activeId}
          highlightId={null}
          onAnimalTap={(id) => void game.onAnimalTap(id)}
        />
      </main>

      <p className="audio-note">{content.ui.audioPlaceholderBadge}</p>
    </div>
  )
}
