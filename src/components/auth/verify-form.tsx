"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { resendOTP, verifyOtp } from "@/server/auth.action"
export default function VerifyForm({email: initialEmailProp = ""}: {email?: string}) {
  const router = useRouter()
  const params = useSearchParams()
  

  const initialEmail = useMemo(() => params.get("email") || "", [params])
  const [email, setEmail] = useState(initialEmail)
  const [otp, setOtp] = useState("")
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [sentCode, setSentCode] = useState<string | null>(null)

  useEffect(() => {
    if (initialEmail) setEmail(initialEmail)
  }, [initialEmail])

  function isValidEmail(v: string) {
    return /\S+@\S+\.\S+/.test(v)
  }

  const onReSendOtp = async() => {
    if (!isValidEmail(email)) {
      toast( "Enter a valid email" )
      return
    }
    setSending(true)
    const res = await resendOTP({email:email.trim(), type: "EMAIL_VERIFICATION"})
    setSending(false)
    if (!res.success) {
      toast( "Failed to send OTP", {description: res.error })
      return
    }
    toast( "OTP sent", {description: "Use the code shown to verify (demo only)" })
  }

  const onVerify = async(e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast( "Enter the 6-digit OTP" )
      return
    }
    setVerifying(true)
    const res =await verifyOtp({email:email.trim(), otp})
    setVerifying(false)
    if (!res.success) {
      toast( "Verification failed", {description: res.error })
      return
    }
    toast("Email verified", {description: "You can log in now" })
    router.push("/")
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-pretty">Verify email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onVerify} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <Button type="button" onClick={onReSendOtp} disabled={sending}>
                {sending ? "Sending..." : "Resend OTP"}
              </Button>
              {sentCode && (
                <span className="text-muted-foreground text-xs" aria-live="polite">
                  Demo code: {sentCode}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="otp" className="sr-only">
                One-time password
              </Label>
              <InputOTP maxLength={6} value={otp} onChange={setOtp} containerClassName="w-full justify-center">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button type="submit" disabled={verifying} className="w-full">
              {verifying ? "Verifying..." : "Verify"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => router.push("/auth/signup")}>
              Back to sign up
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
