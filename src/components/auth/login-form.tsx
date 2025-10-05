"use client"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { signin } from "@/server/auth.action"
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react"

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 300))

    const res = await signin({ email: email.trim(), password })
    setLoading(false)

    if (!res.success) {
      toast.error("Login failed", {
        description: res.error,
        style: {
          background: "hsl(var(--destructive))",
          color: "hsl(var(--destructive-foreground))",
        },
      })
      return
    }

    toast.success("Logged in", {
      description: "Welcome back!",
      style: {
        background: "hsl(var(--primary))",
        color: "hsl(var(--primary-foreground))",
      },
    })
    router.push("/")
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-[#020618] via-[#030a1f] to-[#020618] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[100px] animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <Card className="relative w-full max-w-md border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(34,211,238,0.4)] backdrop-blur-xl bg-[#0a1628]/90 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="h-14 w-14 rounded-full bg-cyan-500/10 flex items-center justify-center animate-in zoom-in duration-500 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Lock className="h-7 w-7 text-cyan-400" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center text-white">Welcome back</CardTitle>
          <CardDescription className="text-center text-gray-300 text-base">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={`text-sm font-medium transition-colors duration-200 ${
                  emailFocused ? "text-cyan-400" : "text-white"
                }`}
              >
                Email
              </Label>
              <div className="relative group">
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                    emailFocused ? "text-cyan-400" : "text-gray-400"
                  }`}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  required
                  className="pl-11 pr-4 h-12 transition-all duration-200 bg-[#0f1f3a]/50 border-cyan-400/30 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 hover:border-cyan-400/50 focus:bg-[#0f1f3a]/70"
                />
                {email && email.includes("@") && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Mail className="h-3 w-3 text-cyan-400" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className={`text-sm font-medium transition-colors duration-200 ${
                  passwordFocused ? "text-cyan-400" : "text-white"
                }`}
              >
                Password
              </Label>
              <div className="relative group">
                <Lock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                    passwordFocused ? "text-cyan-400" : "text-gray-400"
                  }`}
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                  className="pl-11 pr-11 h-12 transition-all duration-200 bg-[#0f1f3a]/50 border-cyan-400/30 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 hover:border-cyan-400/50 focus:bg-[#0f1f3a]/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-1">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-cyan-400/30 bg-[#0f1f3a]/50 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
                />
                <Label
                  htmlFor="remember"
                  className="text-white font-normal cursor-pointer hover:text-cyan-400 transition-colors"
                >
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                onClick={() => router.push("/auth/forgot-password")}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] disabled:hover:scale-100 disabled:opacity-50 group border-0"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Log in
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </Button>

            <div className="text-center text-sm pt-2">
              <span className="text-white">Don't have an account? </span>
              <button
                type="button"
                onClick={() => router.push("/auth/signup")}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200 hover:underline"
              >
                Sign up
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
