"use client"

import { useEffect, useRef, useCallback } from "react"

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef(0)
  const pos = useRef({ x: -300, y: -300 })
  const current = useRef({ x: -300, y: -300 })

  const tick = useCallback(() => {
    current.current.x += (pos.current.x - current.current.x) * 0.12
    current.current.y += (pos.current.y - current.current.y) * 0.12
    if (ref.current) {
      ref.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`
    }
    raf.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX - 200
      pos.current.y = e.clientY - 200
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    raf.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [tick])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-0 hidden h-[400px] w-[400px] rounded-full opacity-[0.035] md:block"
      style={{
        background:
          "radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  )
}
