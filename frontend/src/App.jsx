import React, { useState } from 'react'
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'
import TodoPage from './pages/TodoPage'

export default function App() {
  const [route, setRoute] = useState('login')
  const [token, setToken] = useState(null)

  const onLogin = (tok) => {
    setToken(tok)
    setRoute('todo')
  }

  const onLogout = () => {
    setToken(null)
    setRoute('login')
  }

  return (
    <div className="container">
      <div className="card">
        <div className="nav">
          <a href="/" className="logo">
            <div className="muted">Todo App</div>
          </a>

          {token && (
            <div style={{ marginLeft: 'auto' }} className="flex">
              <button
                className="btn"
                onClick={() => setRoute('profile')}
              >
                Profile
              </button>
              <button className="btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          )}
        </div>

        {route === 'login' && (
          <Login onLogin={onLogin} />
        )}

        {route === 'profile' && (
          <ProfilePage token={token} onProfileSaved={() => setRoute('todo')} />
        )}

        {route === 'todo' && <TodoPage token={token} />}
      </div>
    </div>
  )
}
