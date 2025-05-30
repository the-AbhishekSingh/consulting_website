"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  Check,
  Star,
  Users,
  Code,
  Shield,
  Globe,
  TrendingUp,
  Clock,
  Target,
  Sparkles,
  ChevronDown,
  Zap,
  Rocket,
  Brain,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Sakura Petals Effect Component
function SakuraPetalsEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const petals: Array<{
      x: number
      y: number
      size: number
      speed: number
      drift: number
      rotation: number
      rotationSpeed: number
      opacity: number
      color: string
    }> = []

    // Create sakura petals
    for (let i = 0; i < 80; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 2 + 1,
        drift: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: `rgba(${255}, ${Math.floor(Math.random() * 100 + 180)}, ${Math.floor(Math.random() * 100 + 200)}, ${Math.random() * 0.6 + 0.3})`,
      })
    }

    function drawPetal(petal: any) {
      ctx.save()
      ctx.translate(petal.x, petal.y)
      ctx.rotate((petal.rotation * Math.PI) / 180)
      ctx.globalAlpha = petal.opacity

      // Draw sakura petal shape
      ctx.beginPath()
      ctx.fillStyle = petal.color

      // Create a more realistic petal shape
      const size = petal.size
      ctx.moveTo(0, -size)
      ctx.quadraticCurveTo(size * 0.8, -size * 0.5, size * 0.6, 0)
      ctx.quadraticCurveTo(size * 0.3, size * 0.8, 0, size * 0.4)
      ctx.quadraticCurveTo(-size * 0.3, size * 0.8, -size * 0.6, 0)
      ctx.quadraticCurveTo(-size * 0.8, -size * 0.5, 0, -size)
      ctx.fill()

      // Add a subtle gradient for depth
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size)
      gradient.addColorStop(0, `rgba(255, 255, 255, 0.3)`)
      gradient.addColorStop(1, `rgba(255, 192, 203, 0.1)`)
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.restore()
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      petals.forEach((petal) => {
        drawPetal(petal)

        petal.y += petal.speed
        petal.x += petal.drift
        petal.rotation += petal.rotationSpeed

        // Reset petal when it goes off screen
        if (petal.y > canvas.height + petal.size) {
          petal.y = -petal.size
          petal.x = Math.random() * canvas.width
        }
        if (petal.x > canvas.width + petal.size) {
          petal.x = -petal.size
        } else if (petal.x < -petal.size) {
          petal.x = canvas.width + petal.size
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />
}

// Enhanced Magnetic Button Component with better styling
function MagneticButton({ children, className = "", variant = "primary", ...props }: any) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return

      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const distanceX = x - centerX
      const distanceY = y - centerY

      button.style.transform = `translate(${distanceX * 0.15}px, ${distanceY * 0.15}px) scale(1.05)`
      setGlowPosition({ x, y })
    }

    const handleMouseLeave = () => {
      button.style.transform = "translate(0px, 0px) scale(1)"
      setIsHovered(false)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseDown = () => {
      setIsPressed(true)
    }

    const handleMouseUp = () => {
      setIsPressed(false)
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseleave", handleMouseLeave)
    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mousedown", handleMouseDown)
    button.addEventListener("mouseup", handleMouseUp)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseleave", handleMouseLeave)
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mousedown", handleMouseDown)
      button.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isHovered])

  const getButtonStyles = () => {
    if (variant === "secondary") {
      return "bg-white/90 backdrop-blur-xl text-pink-700 border-2 border-pink-300/50 hover:border-pink-400 hover:bg-white hover:text-pink-800 shadow-lg hover:shadow-pink-200/50"
    }
    return "bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:via-rose-500 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-pink-400/50"
  }

  return (
    <Button
      ref={buttonRef}
      className={`
        relative overflow-hidden rounded-full px-8 py-4 font-semibold
        transition-all duration-500 ease-out
        transform-gpu will-change-transform
        ${getButtonStyles()}
        ${isPressed ? "scale-95" : ""}
        ${className}
      `}
      {...props}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-300/20 via-rose-300/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Moving light effect */}
      {isHovered && (
        <div
          className="absolute w-32 h-32 rounded-full bg-white/30 blur-xl pointer-events-none transition-all duration-300"
          style={{
            left: glowPosition.x - 64,
            top: glowPosition.y - 64,
          }}
        />
      )}

      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

      {/* Floating particles effect */}
      {isHovered && (
        <>
          <div className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
          <div
            className="absolute top-4 right-6 w-1 h-1 bg-white/60 rounded-full animate-ping"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="absolute bottom-3 left-8 w-1 h-1 bg-white/60 rounded-full animate-ping"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 transition-all duration-300">
        {children}
      </span>

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Button>
  )
}

// Enhanced Text Reveal Animation
function TextReveal({ children, delay = 0 }: { children: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={`transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

// Animation hook for scroll-triggered animations
function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isInView] as const
}

// Enhanced Animated Card Component
function AnimatedCard({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
}) {
  const [ref, isInView] = useInView(0.1)
  const [isHovered, setIsHovered] = useState(false)

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(100px)"
      case "down":
        return "translateY(-100px)"
      case "left":
        return "translateX(-100px)"
      case "right":
        return "translateX(100px)"
      default:
        return "translateY(100px)"
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        transform: isInView ? "translateY(0) translateX(0) scale(1)" : `${getTransform()} scale(0.8)`,
        opacity: isInView ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="transition-all duration-500"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        {children}
      </div>
    </div>
  )
}

// Staggered Animation Container
function StaggeredContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, isInView] = useInView(0.1)

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <AnimatedCard delay={index * 200}>{child}</AnimatedCard>
      ))}
    </div>
  )
}

// Enhanced Glitch Text Effect (adapted for sakura theme)
function SakuraText({ children, className = "" }: { children: string; className?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute top-0 left-0 text-pink-400 opacity-70 ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
      >
        {children}
      </span>
      <span
        className={`absolute top-0 left-0 text-rose-300 opacity-70 ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)", animationDelay: "0.1s" }}
      >
        {children}
      </span>
      {isHovered && (
        <span
          className="absolute top-0 left-0 text-pink-200 opacity-70"
          style={{ clipPath: "polygon(0 25%, 100% 25%, 100% 75%, 0 75%)" }}
        >
          {children}
        </span>
      )}
    </div>
  )
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paid, setPaid] = useState(false)
  const router = useRouter()

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    setMounted(true)
    return () => {}
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 text-gray-800 overflow-x-hidden relative">
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative animate-fade-in-up">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent mb-2">
                Contact Evolar
              </h3>
              <p className="text-gray-600">Get in touch with our team</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:contact@evolar.com" className="text-gray-800 hover:text-pink-600 transition-colors">
                    contact@evolar.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a href="tel:+1234567890" className="text-gray-800 hover:text-pink-600 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-800">123 Blockchain Street, Web3 City, 10001</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Sakura Petals Effect */}
      <SakuraPetalsEffect />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-rose-100/20 to-pink-200/30"></div>
        {/* Subtle sakura branch silhouettes */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path
              d="M50 350 Q100 300 150 250 Q200 200 250 150 Q300 100 350 50"
              stroke="rgb(219 39 119)"
              strokeWidth="8"
              fill="none"
              opacity="0.3"
            />
            <circle cx="120" cy="280" r="15" fill="rgb(244 114 182)" opacity="0.4" />
            <circle cx="180" cy="220" r="12" fill="rgb(249 168 212)" opacity="0.4" />
            <circle cx="240" cy="160" r="18" fill="rgb(244 114 182)" opacity="0.4" />
            <circle cx="300" cy="100" r="14" fill="rgb(249 168 212)" opacity="0.4" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-80 h-80 opacity-10">
          <svg viewBox="0 0 320 320" className="w-full h-full">
            <path
              d="M20 300 Q80 250 140 200 Q200 150 260 100"
              stroke="rgb(219 39 119)"
              strokeWidth="6"
              fill="none"
              opacity="0.3"
            />
            <circle cx="90" cy="230" r="12" fill="rgb(244 114 182)" opacity="0.4" />
            <circle cx="150" cy="180" r="16" fill="rgb(249 168 212)" opacity="0.4" />
            <circle cx="210" cy="130" r="10" fill="rgb(244 114 182)" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/80 border-b border-pink-200/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <AnimatedCard direction="left">
              <div className="flex items-center group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-xl flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                    <span className="text-white font-bold text-xl">E</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="relative overflow-hidden ml-2">
                  <span className="text-3xl font-black bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500 tracking-tight inline-block animate-fade-in-up">
                    EVOLAR
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-rose-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </AnimatedCard>

            {/* Navigation */}
            <AnimatedCard direction="right">
              <nav className="hidden md:flex items-center space-x-8">
                {["Services", "Contact"].map((item, index) => (
                  <Link
                    key={item}
                    href={item === "Contact" ? "#" : `#${item.toLowerCase()}`}
                    onClick={item === "Contact" ? (e) => { e.preventDefault(); setShowContactModal(true); } : undefined}
                    className="text-gray-600 hover:text-pink-600 transition-all duration-300 hover:scale-110 relative group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
                <MagneticButton className="text-sm" onClick={scrollToContact}>
                  Get Started
                  <Sparkles className="ml-2 h-4 w-4" />
                </MagneticButton>
              </nav>
            </AnimatedCard>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 lg:py-32 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Floating Badge */}
            <AnimatedCard delay={200}>
              <div className="relative inline-block mb-8">
                <Badge className="bg-gradient-to-r from-pink-400/20 to-rose-400/20 border border-pink-400/30 text-pink-700 px-6 py-2 text-sm backdrop-blur-xl hover:scale-110 transition-all duration-300">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Since 2017 • 200+ Projects Delivered
                </Badge>
              </div>
            </AnimatedCard>

            {/* Main Headline with Gradient Text */}
            <AnimatedCard delay={400}>
              <h1 className="text-6xl lg:text-8xl font-black leading-tight mb-8 text-center">
                <TextReveal delay={0}>
                  <span className="block bg-gradient-to-r from-gray-800 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                    BLOCKCHAIN
                  </span>
                </TextReveal>
                <TextReveal delay={300}>
                  <SakuraText className="block bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent">
                    REVOLUTION
                  </SakuraText>
                </TextReveal>
                <TextReveal delay={600}>
                  <span className="block text-gray-700 text-4xl lg:text-6xl font-normal">Starts Here</span>
                </TextReveal>
              </h1>
            </AnimatedCard>

            {/* Subtitle */}
            <AnimatedCard delay={800}>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
                We're the{" "}
                <span className="text-transparent bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text font-semibold">
                  go-to Web3 consulting agency
                </span>{" "}
                shaping the decentralized world through blockchain innovation
              </p>
            </AnimatedCard>

            {/* Service Tags */}
            <AnimatedCard delay={1000}>
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {["NFT", "DEFI", "SMART CONTRACTS", "GAMEFI", "DAPP", "WEB3"].map((tag, index) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-pink-400/30 text-pink-600 hover:bg-pink-400/10 transition-all duration-500 hover:scale-125 hover:rotate-3 cursor-pointer"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </AnimatedCard>

            {/* CTA Buttons */}
            <AnimatedCard delay={1200}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <MagneticButton className="text-lg" onClick={scrollToContact}>
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Your Project
                </MagneticButton>
              </div>
            </AnimatedCard>

            {/* Scroll Indicator */}
            <AnimatedCard delay={1400}>
              <div>
                <ChevronDown
                  className="w-8 h-8 text-pink-400 mx-auto cursor-pointer hover:scale-125 transition-transform duration-300"
                  onClick={() => {
                    const el = document.getElementById('why-consulting');
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.pageYOffset - 227;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                />
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Floating Stats */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <StaggeredContainer className="grid md:grid-cols-4 gap-8">
            {[
              { number: "200+", label: "Projects Delivered", icon: Code, color: "from-pink-400 to-rose-400" },
              { number: "$2B+", label: "Value Secured", icon: Shield, color: "from-rose-400 to-pink-500" },
              { number: "50+", label: "Enterprise Clients", icon: Users, color: "from-pink-500 to-rose-500" },
              { number: "99.9%", label: "Uptime Achieved", icon: TrendingUp, color: "from-rose-500 to-pink-600" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="group bg-white/60 border border-pink-200/50 hover:bg-white/80 transition-all duration-700 hover:scale-125 hover:shadow-2xl hover:shadow-pink-400/30 hover:-translate-y-8 hover:rotate-3 cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-180 transition-all duration-500`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div
                    className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-20">
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-7xl px-6">
            <AnimatedCard>
              {/* Attractive Consulting Block */}
              <div id="why-consulting" className="w-full flex flex-col items-center justify-center text-center mb-12">
                <Badge className="bg-gradient-to-r from-pink-400/20 to-rose-400/20 border border-pink-400/30 text-pink-700 px-6 py-2 mb-4 hover:scale-110 transition-all duration-300">
                  <Shield className="w-4 h-4 mr-2" />
                  Consulting Excellence
                </Badge>
                <h3 className="text-4xl font-extrabold bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent mb-4 animate-fade-in-up">
                  Why Choose Evolar for Consulting?
                </h3>
                <div className="flex flex-col sm:flex-row gap-6 justify-center mt-2">
                  <div className="flex items-center gap-3 bg-white/70 border border-pink-200/50 rounded-xl px-5 py-3 shadow hover:shadow-pink-200/40 transition-all duration-300 animate-fade-in-up">
                    <Sparkles className="w-6 h-6 text-pink-500" />
                    <span className="text-lg font-semibold text-gray-800">Proven Web3 Expertise</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/70 border border-pink-200/50 rounded-xl px-5 py-3 shadow hover:shadow-pink-200/40 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <Shield className="w-6 h-6 text-rose-500" />
                    <span className="text-lg font-semibold text-gray-800">Enterprise-Grade Security</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/70 border border-pink-200/50 rounded-xl px-5 py-3 shadow hover:shadow-pink-200/40 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <Rocket className="w-6 h-6 text-pink-400" />
                    <span className="text-lg font-semibold text-gray-800">End-to-End Blockchain Solutions</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Code,
                  title: "Smart Contract Development",
                  description: "Secure, audited smart contracts for DeFi, NFTs, and enterprise applications",
                  features: ["Solidity & Vyper", "Security Audits", "Gas Optimization"],
                  gradient: "from-pink-400 to-rose-400",
                },
                {
                  icon: TrendingUp,
                  title: "DeFi Protocol Development",
                  description: "End-to-end DeFi solutions including DEXs, lending protocols, and yield farming",
                  features: ["DEX Development", "Lending Protocols", "Yield Farming"],
                  gradient: "from-rose-400 to-pink-500",
                },
                {
                  icon: Globe,
                  title: "NFT Marketplace Development",
                  description: "Custom NFT marketplaces with advanced features and multi-chain support",
                  features: ["Custom Standards", "Multi-chain", "Royalty Systems"],
                  gradient: "from-pink-500 to-rose-500",
                },
                {
                  icon: Shield,
                  title: "Blockchain Consulting",
                  description: "Strategic guidance for Web3 transformation",
                  features: ["Tech Assessment", "Strategy", "Implementation"],
                  gradient: "from-rose-500 to-pink-600",
                },
                {
                  icon: Users,
                  title: "DAO Development",
                  description: "Decentralized organizations with governance tokens and voting mechanisms",
                  features: ["Governance Tokens", "Voting Systems", "Treasury Management"],
                  gradient: "from-pink-600 to-rose-600",
                },
                {
                  icon: Target,
                  title: "UI/UX Design",
                  description: "Beautiful interfaces and intuitive experiences for Web3 applications",
                  features: ["Web3 Design", "User Research", "Prototyping"],
                  gradient: "from-rose-600 to-pink-700",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="group bg-white/60 border border-pink-200/50 hover:bg-white/80 transition-all duration-1000 hover:scale-110 hover:shadow-2xl hover:shadow-pink-400/30 hover:-translate-y-8 hover:rotate-2 cursor-pointer overflow-hidden relative"
                >
                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  <CardContent className="p-8 relative z-10 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-150 ${service.title === 'DeFi Protocol Development' ? 'group-hover:rotate-[360deg]' : 'group-hover:rotate-180'} transition-all duration-700 mx-auto`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-500 group-hover:bg-clip-text transition-all duration-500 text-center">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 text-center">
                      {service.description}
                    </p>
                    <div className="text-center">
                      <ul className="space-y-3 inline-block text-left">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex justify-center text-sm text-gray-600 group-hover:text-gray-800 transition-all duration-300"
                            style={{ transitionDelay: `${idx * 100}ms` }}
                          >
                            <div
                              className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 group-hover:scale-200 transition-transform duration-300`}
                            ></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </StaggeredContainer>
          </div>
        </div>
      </section>

      {/* Development Packages */}
      <section className="relative z-10 py-20">
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-7xl px-6">
            <AnimatedCard>
              <div className="text-center mb-20">
                <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                  <div className="flex flex-col items-center">
                    <span className="bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent">
                      Choose Your
                    </span>
                    <SakuraText className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                      Development Path
                    </SakuraText>
                  </div>
                </h2>
              </div>
            </AnimatedCard>

            <StaggeredContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "POC",
                  subtitle: "Proof of Concept",
                  price: "From $5K",
                  duration: "2-6 weeks",
                  description: "Perfect for validating your blockchain idea before full development",
                  features: ["Concept Validation", "Technical Feasibility", "Market Research", "Prototype Development"],
                  popular: false,
                  gradient: "from-pink-400 to-rose-400",
                },
                {
                  name: "MVP",
                  subtitle: "Minimum Viable Product",
                  price: "From $25K",
                  duration: "8-16 weeks",
                  description: "Launch your blockchain product quickly and gather user feedback",
                  features: ["Core Features", "User Testing", "Market Launch", "Analytics Setup"],
                  popular: false,
                  gradient: "from-rose-400 to-pink-500",
                },
                {
                  name: "Production",
                  subtitle: "Enterprise Solution",
                  price: "From $100K",
                  duration: "16+ weeks",
                  description: "Full-scale blockchain solution ready for enterprise deployment",
                  features: ["Complete Development", "Security Audits", "Scalability", "24/7 Support"],
                  popular: false,
                  gradient: "from-pink-500 to-rose-500",
                },
              ].map((pkg, index) => (
                <Card
                  key={index}
                  className={`relative bg-white/60 border border-pink-200/50 hover:bg-white/80 transition-all duration-1000 hover:scale-105 hover:shadow-2xl hover:-translate-y-8 hover:rotate-2 cursor-pointer group overflow-hidden ${
                    pkg.popular ? "border-pink-400 shadow-pink-400/20" : "border-pink-200/50 hover:border-pink-400/50"
                  }`}
                >
                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${pkg.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>

                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-1">
                        <Zap className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-8 relative z-10">
                    <div className="text-center mb-8">
                      <div
                        className={`w-20 h-20 bg-gradient-to-r ${pkg.gradient} rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-150 group-hover:rotate-[360deg] transition-all duration-700`}
                      >
                        <span className="text-2xl font-bold text-white">{pkg.name}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-500 group-hover:bg-clip-text transition-all duration-500 text-center">
                        {pkg.subtitle}
                      </h3>
                      <div
                        className={`text-3xl font-bold bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-125 transition-transform duration-300`}
                      >
                        {pkg.price}
                      </div>
                      <div className="flex items-center justify-center text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                        <Clock className="w-4 h-4 mr-2" />
                        {pkg.duration}
                      </div>
                    </div>

                    <p className="text-gray-600 text-center mb-8 group-hover:text-gray-800 transition-colors duration-300">
                      {pkg.description}
                    </p>

                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center group-hover:scale-105 transition-transform duration-300"
                          style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                          <Check
                            className={`w-5 h-5 mr-3 text-pink-500 group-hover:text-rose-500 transition-colors duration-300`}
                          />
                          <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <MagneticButton variant={pkg.popular ? "primary" : "secondary"} className="w-full" onClick={() => setShowPaymentModal(true)}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                    </MagneticButton>
                  </CardContent>
                </Card>
              ))}
            </StaggeredContainer>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <AnimatedCard>
              <div className="text-center mb-20">
                <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-center">
                  <span className="bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent">Client</span>
                  <SakuraText className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    {" "}
                    Success Stories
                  </SakuraText>
                </h2>
              </div>
            </AnimatedCard>

            <StaggeredContainer className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Liam Gist",
                  role: "President, Cloud Nalu",
                  content:
                    "Their team is talented, trustworthy, and absolutely badass! The project was well organized and executed.",
                  avatar: "LG",
                  gradient: "from-pink-400 to-rose-400",
                },
                {
                  name: "Wyeth Ridgway",
                  role: "Founder & CTO, Unioverse",
                  content:
                    "Labrys' technical skills have been exceptional, ensuring that each project was executed flawlessly and on time.",
                  avatar: "WR",
                  gradient: "from-rose-400 to-pink-500",
                },
                {
                  name: "Art Abal",
                  role: "Co-founder, Vana",
                  content:
                    "What stands out about Labrys is their highly experienced engineers, who never fail to deliver high-quality work.",
                  avatar: "AA",
                  gradient: "from-pink-500 to-rose-500",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="group bg-white/60 border border-pink-200/50 hover:bg-white/80 transition-all duration-1000 hover:scale-110 hover:shadow-2xl hover:shadow-pink-400/30 hover:-translate-y-8 hover:-rotate-2 cursor-pointer overflow-hidden relative"
                >
                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current group-hover:scale-125 transition-all duration-300"
                          style={{ transitionDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300 text-center">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div
                        className={`w-14 h-14 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center mr-4 group-hover:scale-150 group-hover:rotate-[360deg] transition-all duration-700`}
                      >
                        <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-500 group-hover:bg-clip-text transition-all duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </StaggeredContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-7xl px-6">
            <AnimatedCard>
              <Card className="bg-gradient-to-r from-pink-400/20 via-rose-400/20 to-pink-500/20 border border-pink-400/30 hover:scale-105 transition-all duration-1000 hover:shadow-2xl hover:shadow-pink-400/50 group overflow-hidden relative">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-rose-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardContent className="p-16 text-center relative z-10">
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent text-center">
                          Ready to
                        </span>
                        <SakuraText className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent text-center group-hover:scale-110 transition-transform duration-500">
                          BUIDL Together?
                        </SakuraText>
                      </div>
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto group-hover:text-gray-800 transition-colors duration-300">
                      Let's transform your blockchain vision into reality. Get a free consultation with our Web3 experts.
                    </p>
                    <MagneticButton className="text-xl px-12 py-6" onClick={scrollToContact}>
                      <Sparkles className="mr-2 h-6 w-6" />
                      Start Your Project
                    </MagneticButton>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20">
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-7xl px-6">
            <AnimatedCard>
              <div className="text-center mb-16">
                <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                  <div className="flex flex-col items-center">
                    <span className="bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent">
                      Get in
                    </span>
                    <SakuraText className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                      Touch
                    </SakuraText>
                  </div>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Drop us a line below and we'll get back to you as soon as possible.
                </p>
              </div>
            </AnimatedCard>

            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/60 border border-pink-200/50">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-300"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-300"
                          placeholder="Your phone number"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                          Company <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-300"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <input
                          type="url"
                          id="website"
                          className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-300"
                          placeholder="https://your-website.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message <span className="text-pink-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-300"
                          placeholder="Your message"
                        ></textarea>
                      </div>
                    </div>
                    <MagneticButton className="w-full">
                      Submit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </MagneticButton>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative animate-fade-in-up">
            <button
              onClick={() => { setShowPaymentModal(false); setPaid(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent">
              Payment
            </h2>
            {paid ? (
              <div className="flex flex-col items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <div className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</div>
                <div className="text-gray-600 text-center">Thank you for your purchase. We will contact you soon.</div>
              </div>
            ) : (
              <form
                className="space-y-6"
                onSubmit={e => {
                  e.preventDefault()
                  setPaid(true)
                }}
              >
                <div>
                  <label htmlFor="card" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card"
                    required
                    maxLength={19}
                    pattern="[0-9 ]{19}"
                    className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-300"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      required
                      maxLength={5}
                      pattern="[0-9/]{5}"
                      className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-300"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      required
                      maxLength={3}
                      pattern="[0-9]{3}"
                      className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-300"
                      placeholder="123"
                    />
                  </div>
                </div>
                <MagneticButton className="w-full text-lg py-3">Pay Now</MagneticButton>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
