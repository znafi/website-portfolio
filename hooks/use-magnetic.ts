"use client"

import { useRef, useCallback } from "react"

export function useMagnetic(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      el.style.transform = `translate(${dx}px, ${dy}px)`
      el.style.transition = "transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)"
    },
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = "translate(0px, 0px)"
    el.style.transition = "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)"
  }, [])

  return { ref, handleMouseMove, handleMouseLeave }
}
