import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex">
      {/* Left panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 bg-white">
        <div className="max-w-sm w-full space-y-8">
          <div className="flex items-center gap-3">
            <Image src="/zentask-icon.png" alt="ZenTask" width={44} height={44} />
            <span className="text-2xl font-semibold text-primary">ZenTask</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground leading-tight">
              Welcome to ZenTask
            </h1>
            <p className="text-lg text-muted-foreground">Where productivity takes root.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="text-center py-3 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="text-center py-3 px-6 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-accent transition-colors"
            >
              Create Account
            </Link>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            A calm, focused space for your tasks and goals.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div
        className="hidden lg:flex flex-1 flex-col items-center justify-center rounded-l-3xl"
        style={{ background: 'linear-gradient(145deg, #4b6f5e 0%, #2e4438 60%, #1a2e24 100%)' }}
      >
        <div className="text-white text-center px-14 space-y-4">
          <div className="text-7xl">🌱</div>
          <h2 className="text-3xl font-semibold">Stay grounded.</h2>
          <p className="text-lg opacity-75 max-w-xs leading-relaxed">
            Organize your work naturally. Focus on what truly matters.
          </p>
        </div>
      </div>
    </main>
  )
}
