import { useCallback, useEffect, useRef, useState } from 'react'
import { audioManager } from '../audio/AudioManager'
import type { Animal, AnimalId, FarmContent, Mode } from '../types'

export type FindFeedback = 'idle' | 'correct' | 'wrong'

export function useFarmGame(content: FarmContent) {
  const [started, setStarted] = useState(false)
  const [mode, setMode] = useState<Mode>('kesfet')
  const [activeId, setActiveId] = useState<AnimalId | null>(null)
  const [targetId, setTargetId] = useState<AnimalId | null>(null)
  const [feedback, setFeedback] = useState<FindFeedback>('idle')
  const [busy, setBusy] = useState(false)
  const targetRef = useRef<AnimalId | null>(null)

  const pickTarget = useCallback(() => {
    const list = content.animals
    let next = list[Math.floor(Math.random() * list.length)].id
    if (list.length > 1 && next === targetRef.current) {
      next = list[(list.findIndex((a) => a.id === next) + 1) % list.length].id
    }
    targetRef.current = next
    setTargetId(next)
    return next
  }, [content.animals])

  const animalById = useCallback(
    (id: AnimalId): Animal => content.animals.find((a) => a.id === id)!,
    [content.animals],
  )

  const start = useCallback(async () => {
    await audioManager.unlock()
    setStarted(true)
  }, [])

  const announceFind = useCallback(
    async (id: AnimalId) => {
      setBusy(true)
      setFeedback('idle')
      try {
        await audioManager.playPrompt(animalById(id).promptText, content.fx.chime)
      } finally {
        setBusy(false)
      }
    },
    [animalById, content.fx.chime],
  )

  const switchMode = useCallback(
    async (next: Mode) => {
      audioManager.stop()
      setActiveId(null)
      setFeedback('idle')
      setMode(next)
      if (next === 'bul') {
        const id = pickTarget()
        // slight delay so UI paints mode first
        await new Promise((r) => setTimeout(r, 120))
        await announceFind(id)
      } else {
        setTargetId(null)
        targetRef.current = null
      }
    },
    [announceFind, pickTarget],
  )

  const replayPrompt = useCallback(async () => {
    if (mode !== 'bul' || !targetId || busy) return
    await announceFind(targetId)
  }, [announceFind, busy, mode, targetId])

  const onAnimalTap = useCallback(
    async (id: AnimalId) => {
      if (!started || busy) return
      const animal = animalById(id)

      if (mode === 'kesfet') {
        setBusy(true)
        setActiveId(id)
        try {
          await audioManager.playUrl(animal.sound)
        } catch {
          // swallow — placeholder may fail on strict browsers
        } finally {
          setTimeout(() => setActiveId(null), 420)
          setBusy(false)
        }
        return
      }

      // Bul bakalım
      if (!targetId) return
      setActiveId(id)
      setBusy(true)

      if (id === targetId) {
        setFeedback('correct')
        try {
          await audioManager.playUrl(content.fx.correct)
          await audioManager.playUrl(animal.sound)
        } catch {
          /* ignore */
        }
        setTimeout(() => setActiveId(null), 500)
        const next = pickTarget()
        setFeedback('idle')
        await announceFind(next)
        setBusy(false)
      } else {
        setFeedback('wrong')
        try {
          await audioManager.playUrl(content.fx.again)
        } catch {
          /* ignore */
        }
        setTimeout(() => {
          setActiveId(null)
          setFeedback('idle')
        }, 500)
        setBusy(false)
      }
    },
    [
      animalById,
      announceFind,
      busy,
      content.fx.again,
      content.fx.correct,
      mode,
      pickTarget,
      started,
      targetId,
    ],
  )

  useEffect(() => {
    return () => audioManager.stop()
  }, [])

  return {
    started,
    mode,
    activeId,
    targetId,
    feedback,
    busy,
    start,
    switchMode,
    replayPrompt,
    onAnimalTap,
    targetName: targetId ? animalById(targetId).name : null,
  }
}
