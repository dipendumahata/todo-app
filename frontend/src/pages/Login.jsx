import React, { useState } from 'react'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('testuser')
  const [password, setPassword] = useState('1234')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(null); setLoading(true)
    try {
      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (res.ok && data.token) {
        onLogin(data.token)
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Network error')
    }
    setLoading(false)
  }

  return (
    <div className="login-container">
      <form onSubmit={submit} className="login-form">
        <h2 className="login-title">Login</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button className="btn" disabled={loading}>
          {loading ? 'Logging...' : 'Login'}
        </button>

        <div className="muted hint">Hint: testuser / 1234</div>
      </form>
    </div>
  )
}
