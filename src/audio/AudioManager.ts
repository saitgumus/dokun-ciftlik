/** Single-sound audio manager — unlocks on first user gesture. */

export class AudioManager {
  private unlocked = false
  private current: HTMLAudioElement | null = null

  get isUnlocked() {
    return this.unlocked
  }

  async unlock(): Promise<void> {
    if (this.unlocked) return
    // Resume AudioContext via a silent play attempt on a tiny buffer if needed,
    // and warm speech synthesis with empty utterance cancel.
    try {
      const silent = new Audio(
        'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
      )
      silent.volume = 0.01
      await silent.play()
      silent.pause()
    } catch {
      // Still mark unlocked; subsequent taps will retry under user gesture.
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    this.unlocked = true
  }

  stop(): void {
    if (this.current) {
      this.current.pause()
      this.current.currentTime = 0
      this.current = null
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }

  playUrl(url: string): Promise<void> {
    this.stop()
    return new Promise((resolve, reject) => {
      const audio = new Audio(url)
      this.current = audio
      audio.onended = () => {
        if (this.current === audio) this.current = null
        resolve()
      }
      audio.onerror = () => {
        if (this.current === audio) this.current = null
        reject(new Error(`Ses yüklenemedi: ${url}`))
      }
      void audio.play().catch(reject)
    })
  }

  /** Speak Turkish prompt via Web Speech API (falls back to chime). */
  speak(text: string, lang = 'tr-TR'): Promise<void> {
    this.stop()
    if (!('speechSynthesis' in window)) {
      return Promise.resolve()
    }
    return new Promise((resolve) => {
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = lang
      utter.rate = 0.9
      utter.pitch = 1.05
      utter.onend = () => resolve()
      utter.onerror = () => resolve()
      window.speechSynthesis.speak(utter)
    })
  }

  async playPrompt(text: string, chimeUrl?: string): Promise<void> {
    if (chimeUrl) {
      try {
        await this.playUrl(chimeUrl)
      } catch {
        // ignore chime failure
      }
    }
    await this.speak(text)
  }
}

export const audioManager = new AudioManager()
