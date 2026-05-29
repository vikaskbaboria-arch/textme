'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../login/auth.module.css'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [verifyStep, setVerifyStep] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Registration failed')
      setLoading(false)
      return
    }

    const data = await res.json()
    setSuccess(data.message || 'Verification code sent to your email.')
    setVerifyStep(true)
    setLoading(false)
  }

  async function handleVerifyOtp(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, otp }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'OTP verification failed')
      setLoading(false)
      return
    }

    await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    })

    router.push('/')
    router.refresh()
  }

  async function handleResendOtp() {
    setError('')
    setSuccess('')
    setLoading(true)

    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email }),
    })

    const data = await res.json()
    setLoading(false)
    setSuccess(data.message || 'A new verification code has been sent.')
    if (!res.ok) setError(data.error || 'Unable to resend OTP')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="14" fill="rgba(45,212,191,0.1)" />
            <path d="M12 16C12 13.8 13.8 12 16 12H32C34.2 12 36 13.8 36 16V28C36 30.2 34.2 32 32 32H26L20 36V32H16C13.8 32 12 30.2 12 28V16Z"
              stroke="#2dd4bf" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="19" cy="22" r="1.5" fill="#2dd4bf" />
            <circle cx="24" cy="22" r="1.5" fill="#2dd4bf" />
            <circle cx="29" cy="22" r="1.5" fill="#2dd4bf" />
          </svg>
          <h1 className={styles.brandName}>textMe</h1>
        </div>

        <h2 className={styles.title}>Create account</h2>
        <p className={styles.subtitle}>Start messaging instantly</p>

        {error && <div className={styles.errorBanner}>{error}</div>}
        {success && <div className={styles.successBanner}>{success}</div>}

        {!verifyStep ? (
          <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Full name</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Jane Smith"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              required
              minLength={2}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="At least 6 characters"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? <span className="spinner" /> : 'Create account'}
          </button>
        </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Verification code</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                inputMode="numeric"
                autoComplete="one-time-code"
              />
            </div>

            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? <span className="spinner" /> : 'Verify email'}
            </button>

            <button type="button" className={styles.linkBtn} onClick={handleResendOtp} disabled={loading}>
              Resend code
            </button>
          </form>
        )}

        <p className={styles.switchLink}>
          Already have an account?{' '}
          <Link href="/login" className={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
