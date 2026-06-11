'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

const LEAVES = [
  { emoji: '🍃', delay: 0,   left: '8%',  duration: 7 },
  { emoji: '🌿', delay: 1.4, left: '22%', duration: 5.5 },
  { emoji: '🍃', delay: 0.6, left: '40%', duration: 8 },
  { emoji: '🌱', delay: 2.2, left: '58%', duration: 6.5 },
  { emoji: '🍀', delay: 1.0, left: '72%', duration: 5.2 },
  { emoji: '🍃', delay: 3.0, left: '86%', duration: 7.5 },
  { emoji: '🌿', delay: 1.8, left: '95%', duration: 6 },
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

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/api/auth/callback` },
    })
    if (error) { toast.error(error.message); setGoogleLoading(false) }
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
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Tend to your garden.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {[
              { label: 'Email', type: 'email', value: email, set: setEmail, ph: 'you@example.com', delay: 120 },
              { label: 'Password', type: 'password', value: password, set: setPassword, ph: '••••••••', delay: 170 },
            ].map(({ label, type, value, set, ph, delay }) => (
              <div key={label} className="space-y-1.5 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
                <label className="text-sm font-medium text-foreground">{label}</label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder={ph}
                  required
                  className="w-full px-4 py-2.5 border border-input rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            ))}

            <div className="animate-fade-in-up" style={{ animationDelay: '220ms' }}>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 disabled:opacity-60 transition-opacity"
              >
                {loading && <Loader2 size={15} className="animate-spin" />}
                {loading ? 'Signing in…' : 'Sign In'}
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
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-2.5 border border-input rounded-xl text-sm font-medium text-foreground hover:bg-muted disabled:opacity-60 transition-colors"
            >
              {googleLoading
                ? <Loader2 size={15} className="animate-spin" />
                : <Image src="/googleicon.png" alt="Google" width={16} height={16} />}
              Sign in with Google
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '340ms' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
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
          <div className="text-7xl animate-sway inline-block">🍃</div>
          <h2 className="text-3xl font-semibold">Pick up where you left off.</h2>
          <p className="text-lg opacity-70 max-w-xs leading-relaxed">
            Your garden is waiting for you.
          </p>
        </div>
      </div>
    </main>
  )
}
