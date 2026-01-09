"use client"

import { useEffect, useRef, useState } from 'react'

const Planet3D = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const size = 24 // 24px to match w-6 h-6
        const dpr = window.devicePixelRatio || 1
        canvas.width = size * dpr
        canvas.height = size * dpr
        canvas.style.width = `${size}px`
        canvas.style.height = `${size}px`
        ctx.scale(dpr, dpr)

        const centerX = size / 2
        const centerY = size / 2
        const baseRadius = size / 2 - 2

        let rotation = 0
        let ringRotation = 0
        let rotationSpeed = 0.01
        let ringRotationSpeed = 0.015
        let currentRadius = baseRadius
        let targetRadius = baseRadius
        let tiltX = 0
        let tiltY = 0
        let targetTiltX = 0
        let targetTiltY = 0
        let animationFrameId: number

        function drawPlanet() {
            if (!ctx) return
            
            // Smooth interpolation
            currentRadius += (targetRadius - currentRadius) * 0.1
            tiltX += (targetTiltX - tiltX) * 0.1
            tiltY += (targetTiltY - tiltY) * 0.1
            
            ctx.clearRect(0, 0, size, size)

            // Save context
            ctx.save()

            // Translate to center
            ctx.translate(centerX, centerY)
            
            // Apply tilt based on mouse position
            ctx.rotate(Math.atan2(tiltY, tiltX) * 0.3)
            
            const radius = currentRadius

            // Draw Saturn's rings first (behind the planet)
            ctx.save()
            ctx.rotate(ringRotation)
            
            // Outer ring
            const ringGradient1 = ctx.createLinearGradient(-radius * 1.8, 0, radius * 1.8, 0)
            ringGradient1.addColorStop(0, 'rgba(200, 180, 150, 0.3)')
            ringGradient1.addColorStop(0.3, 'rgba(220, 200, 170, 0.5)')
            ringGradient1.addColorStop(0.5, 'rgba(240, 220, 190, 0.6)')
            ringGradient1.addColorStop(0.7, 'rgba(220, 200, 170, 0.5)')
            ringGradient1.addColorStop(1, 'rgba(200, 180, 150, 0.3)')
            
            ctx.strokeStyle = ringGradient1
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.ellipse(0, 0, radius * 1.6, radius * 0.4, 0, 0, Math.PI * 2)
            ctx.stroke()
            
            // Middle ring
            const ringGradient2 = ctx.createLinearGradient(-radius * 1.5, 0, radius * 1.5, 0)
            ringGradient2.addColorStop(0, 'rgba(180, 160, 130, 0.4)')
            ringGradient2.addColorStop(0.5, 'rgba(230, 210, 180, 0.7)')
            ringGradient2.addColorStop(1, 'rgba(180, 160, 130, 0.4)')
            
            ctx.strokeStyle = ringGradient2
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.ellipse(0, 0, radius * 1.3, radius * 0.35, 0, 0, Math.PI * 2)
            ctx.stroke()
            
            // Inner ring
            const ringGradient3 = ctx.createLinearGradient(-radius * 1.2, 0, radius * 1.2, 0)
            ringGradient3.addColorStop(0, 'rgba(160, 140, 110, 0.3)')
            ringGradient3.addColorStop(0.5, 'rgba(210, 190, 160, 0.6)')
            ringGradient3.addColorStop(1, 'rgba(160, 140, 110, 0.3)')
            
            ctx.strokeStyle = ringGradient3
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.ellipse(0, 0, radius * 1.1, radius * 0.3, 0, 0, Math.PI * 2)
            ctx.stroke()
            
            ctx.restore()

            // Draw Saturn planet sphere with Saturn-like colors
            ctx.rotate(rotation)
            
            const planetGradient = ctx.createRadialGradient(
                -radius * 0.3,
                -radius * 0.3,
                0,
                0,
                0,
                radius
            )

            // Saturn-like gradient (yellow/orange/beige)
            planetGradient.addColorStop(0, '#f4d03f') // Bright yellow-gold (highlight)
            planetGradient.addColorStop(0.2, '#f39c12') // Golden orange
            planetGradient.addColorStop(0.5, '#e67e22') // Orange
            planetGradient.addColorStop(0.7, '#d35400') // Dark orange
            planetGradient.addColorStop(1, '#a04000') // Deep orange-brown

            ctx.fillStyle = planetGradient
            ctx.beginPath()
            ctx.arc(0, 0, radius, 0, Math.PI * 2)
            ctx.fill()

            // Add surface bands (Saturn's characteristic bands)
            ctx.fillStyle = 'rgba(212, 84, 0, 0.3)'
            ctx.fillRect(-radius, -radius * 0.3, radius * 2, radius * 0.2)
            ctx.fillRect(-radius, radius * 0.1, radius * 2, radius * 0.15)

            // Add highlight for 3D effect
            const highlightGradient = ctx.createRadialGradient(
                -radius * 0.4,
                -radius * 0.4,
                0,
                -radius * 0.4,
                -radius * 0.4,
                radius * 0.6
            )
            highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
            highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

            ctx.fillStyle = highlightGradient
            ctx.beginPath()
            ctx.arc(-radius * 0.3, -radius * 0.3, radius * 0.5, 0, Math.PI * 2)
            ctx.fill()

            // Draw rings in front (top part)
            ctx.save()
            ctx.rotate(ringRotation)
            
            // Outer ring front
            ctx.strokeStyle = ringGradient1
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.ellipse(0, 0, radius * 1.6, radius * 0.4, 0, 0, Math.PI)
            ctx.stroke()
            
            // Middle ring front
            ctx.strokeStyle = ringGradient2
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.ellipse(0, 0, radius * 1.3, radius * 0.35, 0, 0, Math.PI)
            ctx.stroke()
            
            // Inner ring front
            ctx.strokeStyle = ringGradient3
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.ellipse(0, 0, radius * 1.1, radius * 0.3, 0, 0, Math.PI)
            ctx.stroke()
            
            ctx.restore()

            // Add glow effect on hover
            if (isHovered) {
                ctx.shadowBlur = 8
                ctx.shadowColor = 'rgba(244, 208, 63, 0.6)'
            }

            // Restore context
            ctx.restore()

            rotation += rotationSpeed
            ringRotation += ringRotationSpeed
            animationFrameId = requestAnimationFrame(drawPlanet)
        }

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            
            const deltaX = e.clientX - centerX
            const deltaY = e.clientY - centerY
            
            targetTiltX = deltaX * 0.1
            targetTiltY = deltaY * 0.1
        }

        // Mouse enter handler
        const handleMouseEnter = () => {
            setIsHovered(true)
            targetRadius = baseRadius * 1.2
            rotationSpeed = 0.03
            ringRotationSpeed = 0.04
        }

        // Mouse leave handler
        const handleMouseLeave = () => {
            setIsHovered(false)
            targetRadius = baseRadius
            rotationSpeed = 0.01
            ringRotationSpeed = 0.015
            targetTiltX = 0
            targetTiltY = 0
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener('mouseenter', handleMouseEnter)
            container.addEventListener('mouseleave', handleMouseLeave)
            container.addEventListener('mousemove', handleMouseMove)
        }

        drawPlanet()

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }
            if (container) {
                container.removeEventListener('mouseenter', handleMouseEnter)
                container.removeEventListener('mouseleave', handleMouseLeave)
                container.removeEventListener('mousemove', handleMouseMove)
            }
        }
    }, [isHovered])

    return (
        <div 
            ref={containerRef}
            className="relative w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110"
        >
            <canvas
                ref={canvasRef}
                className="w-6 h-6 rounded-md"
            />
            {isHovered && (
                <div className="absolute inset-0 rounded-md bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-sm -z-10 animate-pulse" />
            )}
        </div>
    )
}

export default Planet3D

