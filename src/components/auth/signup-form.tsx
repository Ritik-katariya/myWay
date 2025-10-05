"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { toast } from "sonner"
import { signup } from "@/server/auth.action"
import VerifyForm from "./verify-form"
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from "lucide-react"

export default function SignupForm() {
  const router = useRouter()
  const [Verify, setVerify] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  function isValidEmail(v: string) {
    return /\S+@\S+\.\S+/.test(v)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return toast("Name is required")
    if (!isValidEmail(email)) return toast("Enter a valid email")
    if (password.length < 6) return toast("Password must be at least 6 characters")
    if (password !== confirm) return toast("Passwords do not match")
    setLoading(true)
  const res = await signup({ name, email, password })
  console.log(res);
    setLoading(false)
    if (!res.success) {
      toast("Signup failed", { description: res.error })
      return
    }
    toast("Account created", { description: "Verify your email with the OTP" })
    setVerify(true)
  }

  if (Verify) return <VerifyForm email={email} />

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a0e27] via-[#0f1629] to-[#0a0e27] p-4">
      <Card className="relative w-full max-w-md overflow-hidden border-2 border-cyan-500/50 bg-[#0f1629]/95 shadow-[0_0_50px_rgba(6,182,212,0.3)] backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        <CardHeader className="space-y-3 pb-6 pt-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 ring-2 ring-cyan-500/30">
            <UserPlus className="h-8 w-8 text-cyan-400" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">Create account</h1>
          <p className="text-sm text-gray-300">Enter your details to get started</p>
        </CardHeader>

        <CardContent className="pb-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-white">
                Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 border-gray-700 bg-[#1a1f3a]/50 pl-11 text-white placeholder:text-gray-500 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-gray-700 bg-[#1a1f3a]/50 pl-11 text-white placeholder:text-gray-500 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-white">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 border-gray-700 bg-[#1a1f3a]/50 pl-11 pr-11 text-white placeholder:text-gray-500 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-cyan-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-sm font-medium text-white">
                Confirm password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  className="h-12 border-gray-700 bg-[#1a1f3a]/50 pl-11 pr-11 text-white placeholder:text-gray-500 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-cyan-400"
                >
                  {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full bg-gradient-to-r from-cyan-500 to-cyan-600 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-cyan-500/50 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Sign up"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/auth")}
              className="w-full text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400"
            >
              Already have an account? <span className="ml-1 font-semibold text-cyan-400">Log in</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
