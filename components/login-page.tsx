"use client"

import { useState, type FormEvent } from "react"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<"admin" | "investigator">("admin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    let isValid = true
    setEmailError("")
    setPasswordError("")

    if (!email.trim()) {
      setEmailError("Email address is required")
      isValid = false
    } else if (!validateEmail(email.trim())) {
      setEmailError("Please enter a valid email address")
      isValid = false
    }

    if (!password) {
      setPasswordError("Password is required")
      isValid = false
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      isValid = false
    }

    if (!isValid) return

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      const displayRole = selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)
      setToast({ message: `Signed in as ${displayRole}. Redirecting...`, type: "success" })
      setTimeout(() => setToast(null), 3000)
    }, 1500)
  }

  return (
    <div style={styles.wrapper}>
      {/* Toast */}
      {toast && (
        <div
          style={{
            ...styles.toast,
            backgroundColor: toast.type === "success" ? "#10b981" : "#ef4444",
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Left Panel */}
      <div style={styles.left}>
        <div style={styles.brand}>
          <div style={styles.brandIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span style={styles.brandName}>ForensicDesk</span>
        </div>
        <div style={styles.leftContent}>
          <h1 style={styles.heading}>
            Digital Forensic<br />Investigation Platform
          </h1>
          <p style={styles.description}>
            Secure access to case management, evidence analysis, and investigation tools. Role-based authentication ensures proper access control.
          </p>
          <div style={styles.statsRow}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>256-bit</span>
              <span style={styles.statLabel}>Encryption</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>99.9%</span>
              <span style={styles.statLabel}>Uptime</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>SOC 2</span>
              <span style={styles.statLabel}>Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Sign In</h2>
          <p style={styles.cardSubtitle}>Select your role and enter credentials</p>

          {/* Role Selector */}
          <div style={styles.roleSelector}>
            <button
              type="button"
              onClick={() => setSelectedRole("admin")}
              style={{
                ...styles.roleBtn,
                ...(selectedRole === "admin" ? styles.roleBtnActive : {}),
              }}
            >
              <div
                style={{
                  ...styles.roleIcon,
                  ...(selectedRole === "admin" ? styles.roleIconActive : {}),
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div style={styles.roleInfo}>
                <span style={styles.roleTitle}>Admin</span>
                <span style={styles.roleDesc}>Full system access</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole("investigator")}
              style={{
                ...styles.roleBtn,
                ...(selectedRole === "investigator" ? styles.roleBtnActive : {}),
              }}
            >
              <div
                style={{
                  ...styles.roleIcon,
                  ...(selectedRole === "investigator" ? styles.roleIconActive : {}),
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div style={styles.roleInfo}>
                <span style={styles.roleTitle}>Investigator</span>
                <span style={styles.roleDesc}>Case management</span>
              </div>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError("")
                  }}
                  style={{
                    ...styles.input,
                    ...(emailError ? styles.inputError : {}),
                  }}
                />
              </div>
              <span style={styles.errorMessage}>{emailError}</span>
            </div>

            {/* Password */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordError("")
                  }}
                  style={{
                    ...styles.input,
                    ...(passwordError ? styles.inputError : {}),
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.togglePassword}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" y1="2" x2="22" y2="22" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <span style={styles.errorMessage}>{passwordError}</span>
            </div>

            {/* Options */}
            <div style={styles.formOptions}>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" style={styles.checkbox} />
                Remember me
              </label>
              <a href="#" style={styles.forgotLink}>Forgot password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.submitBtn,
                ...(isLoading ? styles.submitBtnDisabled : {}),
              }}
            >
              {isLoading ? (
                <div style={styles.spinner} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div style={styles.footer}>
            <p style={styles.footerText}>Protected by enterprise-grade security</p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        button:hover {
          filter: brightness(1.1);
        }

        input:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
        }

        @media (max-width: 900px) {
          .login-wrapper-responsive {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: "#0a0a0f",
    color: "#e8e8f0",
  },
  toast: {
    position: "fixed",
    top: 24,
    right: 24,
    padding: "16px 24px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 500,
    color: "#fff",
    zIndex: 100,
    animation: "fadeIn 0.3s ease",
  },
  // Left
  left: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 40,
    background: "linear-gradient(160deg, rgba(59,130,246,0.06) 0%, transparent 50%), #0a0a0f",
    borderRight: "1px solid #2a2a3a",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  brandIcon: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b82f6",
    color: "#fff",
    borderRadius: 6,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "#e8e8f0",
  },
  leftContent: {
    maxWidth: 480,
  },
  heading: {
    fontSize: 44,
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: "-0.03em",
    color: "#e8e8f0",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#8888a0",
    lineHeight: 1.6,
    marginBottom: 40,
    maxWidth: 400,
  },
  statsRow: {
    display: "flex",
    gap: 40,
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 700,
    color: "#e8e8f0",
  },
  statLabel: {
    fontSize: 13,
    color: "#5c5c72",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  // Right
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#111118",
  },
  card: {
    width: "100%",
    maxWidth: 420,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    marginBottom: 6,
    color: "#e8e8f0",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#8888a0",
    marginBottom: 32,
  },
  // Role selector
  roleSelector: {
    display: "flex",
    gap: 12,
    marginBottom: 28,
  },
  roleBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    backgroundColor: "#1a1a24",
    border: "1.5px solid #2a2a3a",
    borderRadius: 10,
    cursor: "pointer",
    color: "#8888a0",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  },
  roleBtnActive: {
    borderColor: "#3b82f6",
    backgroundColor: "rgba(59,130,246,0.15)",
    color: "#e8e8f0",
    boxShadow: "0 0 0 3px rgba(59,130,246,0.08)",
  },
  roleIcon: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111118",
    borderRadius: 6,
    flexShrink: 0,
  },
  roleIconActive: {
    backgroundColor: "#3b82f6",
    color: "#fff",
  },
  roleInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    textAlign: "left",
  },
  roleTitle: {
    fontSize: 14,
    fontWeight: 600,
  },
  roleDesc: {
    fontSize: 12,
    color: "#5c5c72",
  },
  // Form
  formGroup: {
    marginBottom: 20,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#8888a0",
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: 14,
    color: "#5c5c72",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "12px 14px 12px 44px",
    backgroundColor: "#1a1a24",
    border: "1.5px solid #2a2a3a",
    borderRadius: 10,
    fontFamily: "inherit",
    fontSize: 14,
    color: "#e8e8f0",
    outline: "none",
    transition: "all 0.2s ease",
  },
  inputError: {
    borderColor: "#ef4444",
    boxShadow: "0 0 0 3px rgba(239,68,68,0.08)",
  },
  togglePassword: {
    position: "absolute",
    right: 12,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#5c5c72",
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessage: {
    display: "block",
    fontSize: 12,
    color: "#ef4444",
    marginTop: 6,
    minHeight: 18,
  },
  // Options
  formOptions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: "#8888a0",
    cursor: "pointer",
  },
  checkbox: {
    width: 16,
    height: 16,
    accentColor: "#3b82f6",
    cursor: "pointer",
  },
  forgotLink: {
    fontSize: 13,
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: 500,
  },
  // Submit
  submitBtn: {
    width: "100%",
    padding: "13px 24px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  submitBtnDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  spinner: {
    width: 20,
    height: 20,
    border: "2.5px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },
  // Footer
  footer: {
    marginTop: 32,
    textAlign: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#5c5c72",
  },
}
