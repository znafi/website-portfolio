"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorGlow() {
  const mouseX = useMotionValue(-400)
  const mouseY = useMotionValue(-400)

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 25 })
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 25 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200)
      mouseY.set(e.clientY - 200)
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-0 hidden h-[400px] w-[400px] rounded-full opacity-[0.04] blur-[100px] md:block"
      style={{
        x: smoothX,
        y: smoothY,
        background: "radial-gradient(circle, #ffffff, transparent 70%)",
      }}
      aria-hidden="true"
    />
  )
}
