"use client"

import { useState, type FormEvent } from "react"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<"admin" | "investigator">("admin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    let valid = true
    setEmailError("")
    setPasswordError("")

    if (!email.trim()) {
      setEmailError("Email is required")
      valid = false
    } else if (!email.includes("@")) {
      setEmailError("Enter a valid email")
      valid = false
    }

    if (!password) {
      setPasswordError("Password is required")
      valid = false
    } else if (password.length < 6) {
      setPasswordError("Minimum 6 characters")
      valid = false
    }

    if (!valid) return

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      const roleName = selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)
      setToast({ message: `Welcome, ${roleName}! Redirecting...`, type: "success" })
      setTimeout(() => setToast(null), 3000)
    }, 1500)
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .login-body {
          font-family: Arial, sans-serif;
          background-color: #0f172a;
          color: #e2e8f0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-container { width: 100%; max-width: 420px; padding: 20px; }

        .login-box {
          background-color: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 40px 32px;
        }

        .login-box h1 {
          text-align: center;
          font-size: 28px;
          color: #f1f5f9;
          margin-bottom: 4px;
        }

        .subtitle {
          text-align: center;
          font-size: 14px;
          color: #94a3b8;
          margin-bottom: 28px;
        }

        .role-buttons { display: flex; gap: 10px; margin-bottom: 24px; }

        .role-btn {
          flex: 1;
          padding: 10px;
          font-size: 14px;
          font-weight: 600;
          border: 2px solid #334155;
          border-radius: 8px;
          background-color: transparent;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s;
        }

        .role-btn:hover { border-color: #475569; color: #e2e8f0; }

        .role-btn.active {
          border-color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .form-group { margin-bottom: 18px; }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
          margin-bottom: 6px;
        }

        .form-group input {
          width: 100%;
          padding: 10px 14px;
          font-size: 14px;
          color: #e2e8f0;
          background-color: #0f172a;
          border: 1px solid #334155;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input::placeholder { color: #475569; }
        .form-group input:focus { border-color: #3b82f6; }
        .form-group input.has-error { border-color: #ef4444; }

        .error-msg {
          display: block;
          font-size: 12px;
          color: #ef4444;
          margin-top: 4px;
          min-height: 16px;
        }

        .form-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          font-size: 13px;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #94a3b8;
          cursor: pointer;
        }

        .remember input { accent-color: #3b82f6; }

        .forgot {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .forgot:hover { text-decoration: underline; }

        .login-btn {
          width: 100%;
          padding: 12px;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          background-color: #3b82f6;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .login-btn:hover { background-color: #2563eb; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .footer-text {
          text-align: center;
          font-size: 12px;
          color: #475569;
          margin-top: 24px;
        }

        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          z-index: 100;
          background-color: #10b981;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .login-box { padding: 28px 20px; }
          .role-buttons { flex-direction: column; }
        }
      `}</style>

      <div className="login-body">
        {toast && <div className="toast">{toast.message}</div>}

        <div className="login-container">
          <div className="login-box">
            <h1>ForensicDesk</h1>
            <p className="subtitle">Sign in to your account</p>

            {/* Role Selection */}
            <div className="role-buttons">
              <button
                type="button"
                className={`role-btn ${selectedRole === "admin" ? "active" : ""}`}
                onClick={() => setSelectedRole("admin")}
              >
                Admin
              </button>
              <button
                type="button"
                className={`role-btn ${selectedRole === "investigator" ? "active" : ""}`}
                onClick={() => setSelectedRole("investigator")}
              >
                Investigator
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  className={emailError ? "has-error" : ""}
                />
                <span className="error-msg">{emailError}</span>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                  className={passwordError ? "has-error" : ""}
                />
                <span className="error-msg">{passwordError}</span>
              </div>

              <div className="form-row">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#" className="forgot">Forgot password?</a>
              </div>

              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="footer-text">Protected by enterprise-grade security</p>
          </div>
        </div>
      </div>
    </>
  )
}
