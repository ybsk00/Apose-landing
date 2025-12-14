"use client"

import { useEffect, useRef, useState } from "react"

export function ThreeBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number | undefined>(undefined)
    const timeRef = useRef(0)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const setCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        setCanvasSize()
        window.addEventListener("resize", setCanvasSize)

        const gridSize = isMobile ? 25 : 40
        const waveAmplitude = isMobile ? 30 : 50
        const waveSpeed = 0.02

        const animate = () => {
            if (!ctx || !canvas) return

            timeRef.current += waveSpeed

            ctx.fillStyle = "#0a0f1a"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const cols = Math.ceil(canvas.width / gridSize) + 1
            const rows = Math.ceil(canvas.height / gridSize) + 1
            const perspective = 300
            const centerX = canvas.width / 2
            const centerY = canvas.height * 0.6

            const points: { x: number; y: number; z: number }[][] = []

            for (let row = 0; row < rows; row++) {
                points[row] = []
                for (let col = 0; col < cols; col++) {
                    const x = col * gridSize
                    const y = row * gridSize

                    const wave1 = Math.sin(x * 0.01 + timeRef.current * 2) * waveAmplitude
                    const wave2 = Math.cos(y * 0.015 + timeRef.current * 1.5) * waveAmplitude * 0.7
                    const wave3 = Math.sin((x + y) * 0.008 + timeRef.current) * waveAmplitude * 0.5
                    const z = wave1 + wave2 + wave3

                    const scale = perspective / (perspective + z * 0.5)
                    const projX = centerX + (x - centerX) * scale
                    const projY = centerY + (y - centerY) * scale * 0.5 + z * 0.8

                    points[row][col] = { x: projX, y: projY, z }
                }
            }

            ctx.lineWidth = 0.5

            for (let row = 0; row < rows; row++) {
                ctx.beginPath()
                for (let col = 0; col < cols; col++) {
                    const point = points[row][col]
                    if (col === 0) {
                        ctx.moveTo(point.x, point.y)
                    } else {
                        ctx.lineTo(point.x, point.y)
                    }
                }
                const rowRatio = row / rows
                const r = Math.floor(6 + rowRatio * 30)
                const g = Math.floor(182 - rowRatio * 50)
                const b = Math.floor(212 - rowRatio * 30)
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.3)`
                ctx.stroke()
            }

            for (let col = 0; col < cols; col++) {
                ctx.beginPath()
                for (let row = 0; row < rows; row++) {
                    const point = points[row][col]
                    if (row === 0) {
                        ctx.moveTo(point.x, point.y)
                    } else {
                        ctx.lineTo(point.x, point.y)
                    }
                }
                const colRatio = col / cols
                const r = Math.floor(6 + colRatio * 50)
                const g = Math.floor(182 - colRatio * 30)
                const b = 212
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.25)`
                ctx.stroke()
            }

            const topGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.3)
            topGradient.addColorStop(0, "#0a0f1a")
            topGradient.addColorStop(1, "transparent")
            ctx.fillStyle = topGradient
            ctx.fillRect(0, 0, canvas.width, canvas.height * 0.3)

            const bottomGradient = ctx.createLinearGradient(0, canvas.height * 0.7, 0, canvas.height)
            bottomGradient.addColorStop(0, "transparent")
            bottomGradient.addColorStop(1, "#0a0f1a")
            ctx.fillStyle = bottomGradient
            ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3)

            const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width * 0.4)
            glowGradient.addColorStop(0, "rgba(6, 182, 212, 0.08)")
            glowGradient.addColorStop(0.5, "rgba(59, 130, 246, 0.04)")
            glowGradient.addColorStop(1, "transparent")
            ctx.fillStyle = glowGradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", setCanvasSize)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isMobile])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                pointerEvents: "none",
            }}
        />
    )
}
