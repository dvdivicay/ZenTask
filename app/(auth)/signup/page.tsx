'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

const LEAVES = [
  { emoji: '🌱', delay: 0.3, left: '12%', duration: 6.5 },
  { emoji: '🍃', delay: 1.6, left: '28%', duration: 8 },
  { emoji: '🌿', delay: 0.8, left: '48%', duration: 5.8 },
  { emoji: '🍃', delay: 2.5, left: '64%', duration: 7 },
  { emoji: '🍀', delay: 1.1, left: '78%', duration: 5.5 },
  { emoji: '🌿', delay: 3.2, left: '92%', duration: 7.8 },
]

function FloatingLeaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {LEAVES.map((leaf, i) => (
        <span
          key={i}
          className="absolute bottom-[-10%] text-2xl animate-float-leaf select-none"
          style={{
            left: leaf.left,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
          }}
        >
          {leaf.emoji}
        </span>
      ))}
    </div>
  )
}

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
    })
    if (error) { toast.error(error.message); setLoading(false) }
    else setConfirmed(true)
  }

  async function handleGoogleSignup() {
    setGoogleLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/api/auth/callback` },
    })
    if (error) { toast.error(error.message); setGoogleLoading(false) }
  }

  if (confirmed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-sm w-full text-center space-y-4 px-8 animate-fade-in-up">
          <div className="text-5xl animate-sprout">📬</div>
          <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
          <p className="text-muted-foreground text-sm">
            We sent a confirmation link to <strong>{email}</strong>.
            Click it to activate your account and start growing.
          </p>
          <Link href="/login" className="inline-block mt-4 text-sm text-primary font-medium hover:underline">
            Back to login
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex">
      {/* Left: form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 bg-white">
        <div className="max-w-sm w-full space-y-6">

          <Link href="/" className="flex items-center gap-2.5 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <Image src="/zentask-icon.png" alt="ZenTask" width={32} height={32} />
            <span className="font-semibold text-primary">ZenTask</span>
          </Link>

          <div className="animate-fade-in-up" style={{ animationDelay: '60ms' }}>
            <h1 className="text-2xl font-bold text-foreground">Plant your first seed</h1>
            <p className="text-sm text-muted-foreground mt-1">Start your zen productivity journey.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 border border-input rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>
            <div className="space-y-1.5 animate-fade-in-up" style={{ animationDelay: '170ms' }}>
              <label className="text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                required
                minLength={6}
                className="w-full px-4 py-2.5 border border-input rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '220ms' }}>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 disabled:opacity-60 transition-opacity"
              >
                {loading && <Loader2 size={15} className="animate-spin" />}
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="relative animate-fade-in-up" style={{ animationDelay: '260ms' }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-muted-foreground">or continue with</span>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-2.5 border border-input rounded-xl text-sm font-medium text-foreground hover:bg-muted disabled:opacity-60 transition-colors"
            >
              {googleLoading
                ? <Loader2 size={15} className="animate-spin" />
                : <Image src="/googleicon.png" alt="Google" width={16} height={16} />}
              Sign up with Google
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '340ms' }}>
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right: decorative panel */}
      <div
        className="hidden lg:flex flex-1 flex-col items-center justify-center rounded-l-3xl relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #4b6f5e 0%, #2e4438 60%, #1a2e24 100%)' }}
      >
        <FloatingLeaves />
        <div className="text-white text-center px-14 space-y-4 relative z-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="text-7xl animate-bloom inline-block">🌿</div>
          <h2 className="text-3xl font-semibold">Grow with intention.</h2>
          <p className="text-lg opacity-70 max-w-xs leading-relaxed">
            Every task you complete makes your garden bloom.
          </p>
        </div>
      </div>
    </main>
  )
}
