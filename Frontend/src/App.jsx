import { useState, useEffect, useRef } from 'react'

/* ───── tiny SVG icons (inline to avoid external deps) ───── */
const BoltIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
  </svg>
)

const ChevronRight = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ───── animated floating particles ───── */
function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,211,238,${p.alpha})`
        ctx.fill()
      })

      // draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(34,211,238,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}

/* ───── countdown timer component ───── */
function Countdown() {
  const target = useRef(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) // 30 days
  const [diff, setDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      let ms = target.current - now
      if (ms < 0) ms = 0
      setDiff({
        days: Math.floor(ms / 86400000),
        hours: Math.floor((ms % 86400000) / 3600000),
        minutes: Math.floor((ms % 3600000) / 60000),
        seconds: Math.floor((ms % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Days', value: diff.days },
    { label: 'Hours', value: diff.hours },
    { label: 'Minutes', value: diff.minutes },
    { label: 'Seconds', value: diff.seconds },
  ]

  return (
    <div className="flex gap-3 sm:gap-5 justify-center">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <span className="text-3xl sm:text-5xl font-bold tabular-nums bg-gradient-to-b from-cyan-300 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-500 mt-1">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ───── email signup component ───── */
function EmailSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-emerald-400 animate-fade-in">
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm">You're on the list! We'll notify you at launch.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
      />
      <button
        type="submit"
        className="group px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold text-sm hover:from-cyan-400 hover:to-emerald-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-95 flex items-center justify-center gap-1.5"
      >
        Notify Me
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </form>
  )
}

/* ───── feature card ───── */
function FeatureCard({ icon, title, description, delay }) {
  return (
    <div
      className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] hover:border-cyan-500/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)] animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <span className="text-lg">{icon}</span>
      </div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

/* ───── main app ───── */
function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: '⚡',
      title: 'Ultra-Fast Charging',
      description: 'Locate and connect to the fastest charging stations near you in seconds.',
    },
    {
      icon: '🗺️',
      title: 'Smart Route Planning',
      description: 'AI-powered routes that optimize for charging stops and battery range.',
    },
    {
      icon: '💳',
      title: 'Seamless Payments',
      description: 'One-tap payments across all supported charging networks. No subscriptions.',
    },
    {
      icon: '📊',
      title: 'Live Analytics',
      description: 'Real-time station availability, pricing, and charging speed insights.',
    },
  ]

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <Particles />

      {/* Ambient glow effects */}
      <div className="fixed top-[-30%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-500/[0.04] blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/[0.03] blur-[120px] pointer-events-none" />

      {/* ── NAVBAR ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/[0.06] backdrop-blur-md bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <BoltIcon className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <div className="absolute inset-0 w-7 h-7 text-cyan-400 blur-sm opacity-60">
              <BoltIcon className="w-7 h-7" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">Volt</span>
            <span className="text-white">ink</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            In Development
          </span>
          <a
            href="https://github.com/chandankoranga02/Voltink"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-400 hover:text-white transition-colors">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <main className="relative z-10">
        <section className="flex flex-col items-center justify-center text-center px-6 pt-20 sm:pt-32 pb-16 sm:pb-24">
          {/* Animated bolt */}
          <div
            className={`relative mb-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative">
              <BoltIcon className="w-20 h-20 sm:w-28 sm:h-28 text-cyan-400 animate-float drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]" />
              <div className="absolute inset-0 animate-float">
                <BoltIcon className="w-20 h-20 sm:w-28 sm:h-28 text-cyan-400 blur-md opacity-40" />
              </div>
              {/* orbiting ring */}
              <div className="absolute inset-[-20px] sm:inset-[-30px] border border-cyan-500/20 rounded-full animate-spin-slow" />
              <div className="absolute inset-[-40px] sm:inset-[-55px] border border-dashed border-cyan-500/10 rounded-full animate-spin-reverse" />
            </div>
          </div>

          {/* Heading */}
          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="block text-white">The Future of</span>
            <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              EV Charging
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed mb-10 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Voltink is building the smartest EV charging network. Find stations, plan routes, and charge your vehicle — all from one beautiful app.
          </p>

          {/* Countdown */}
          <div
            className={`mb-10 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-4">Launching In</p>
            <Countdown />
          </div>

          {/* Email signup */}
          <div
            className={`flex justify-center w-full transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <EmailSignup />
          </div>
        </section>


        {/* ── FOOTER ── */}
        <footer className="relative z-10 border-t border-white/[0.06] py-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              &copy; {new Date().getFullYear()} Voltink
              <BoltIcon className="w-3.5 h-3.5 text-cyan-500/50" />
            </span>
            <span className="hidden sm:inline text-slate-700">·</span>
            <span>Smart EV Charging Network</span>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
