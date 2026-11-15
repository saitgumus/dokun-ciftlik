export type AnimalId = 'inek' | 'koyun' | 'tavuk' | 'at' | 'ordek' | 'keci'

export type Mode = 'kesfet' | 'bul'

export interface Animal {
  id: AnimalId
  name: string
  sound: string
  soundLabel: string
  promptText: string
}

export interface FarmContent {
  id: string
  title: string
  brand: string
  tagline: string
  audioNote: string
  ui: {
    start: string
    startHint: string
    modeExplore: string
    modeFind: string
    findPrompt: string
    findCorrect: string
    findAgain: string
    replayPrompt: string
    audioPlaceholderBadge: string
  }
  animals: Animal[]
  fx: {
    chime: string
    correct: string
    again: string
  }
}
