"use client"

import { useEffect, useRef } from "react"

export function CursorGlow() {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const blob = blobRef.current
    if (!blob) return

    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const animate = () => {
      x += (targetX - x) * 0.08
      y += (targetY - y) * 0.08
      if (blob) {
        blob.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={blobRef}
      className="pointer-events-none fixed top-0 left-0 z-0 hidden h-[400px] w-[400px] rounded-full opacity-[0.035] blur-[100px] md:block"
      style={{ background: "radial-gradient(circle, #ffffff, transparent 70%)" }}
      aria-hidden="true"
    />
  )
}
