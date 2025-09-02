import React, { useEffect, useState } from 'react'

function TaskItem({ t, onToggle, onDelete, onEdit }) {
  return (
    <div className="task-item">
      <div className="task-left">
        <input
          type="checkbox"
          checked={t.completed}
          onChange={e => onToggle(t.id, e.target.checked)}
        />
        <span className={t.completed ? 'task-completed' : ''}>{t.title}</span>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(t)} className="edit-btn">Edit</button>
        <button onClick={() => onDelete(t.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  )
}

export default function TodoPage({ token }) {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:4000/tasks', { headers: { Authorization: 'Bearer ' + token } })
      if (res.ok) {
        const data = await res.json()
        setTasks(data)
      }
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  useEffect(() => { fetchTasks() }, [])

  const addTask = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    try {
      const res = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ title })
      })
      if (res.ok) {
        const t = await res.json()
        setTasks(prev => [t, ...prev])
        setTitle('')
      }
    } catch (err) { alert('Network error') }
  }

  const toggle = async (id, completed) => {
    try {
      const res = await fetch('http://localhost:4000/tasks/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ completed })
      })
      if (res.ok) {
        const updated = await res.json()
        setTasks(prev => prev.map(p => p.id === updated.id ? updated : p))
      }
    } catch (err) { console.error(err) }
  }

  const del = async (id) => {
    if (!confirm('Delete this task?')) return
    try {
      const res = await fetch('http://localhost:4000/tasks/' + id, {
        method: 'DELETE', headers: { Authorization: 'Bearer ' + token }
      })
      if (res.ok) {
        setTasks(prev => prev.filter(p => p.id !== id))
      }
    } catch (err) { console.error(err) }
  }

  const startEdit = (task) => {
    setEditingTask(task)
    setEditTitle(task.title)
  }

  const saveEdit = async (e) => {
    e.preventDefault()
    if (!editTitle.trim()) return
    try {
      const res = await fetch('http://localhost:4000/tasks/' + editingTask.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ completed: editingTask.completed, title: editTitle })
      })
      if (res.ok) {
        const updated = await res.json()
        setTasks(prev => prev.map(p => p.id === updated.id ? updated : p))
        setEditingTask(null)
        setEditTitle('')
      }
    } catch (err) { console.error(err) }
  }

  const filtered = tasks.filter(t => {
    if (filter === 'all') return true
    if (filter === 'completed') return t.completed
    return !t.completed
  })

  return (
    <div>
      <h2>Todo</h2>

      {editingTask ? (
        <form onSubmit={saveEdit} className="edit-form">
          <input
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn">Save</button>
          <button type="button" className="btn cancel-btn" onClick={() => setEditingTask(null)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={addTask} className="flex" style={{ marginTop: 12 }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task..." style={{ flex: 1 }} />
          <button className="btn" type="submit">Add</button>
        </form>
      )}

      <div style={{ marginTop: 12 }} className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <div style={{ marginTop: 16 }}>
        {loading ? <div className="muted">Loading...</div> : (
          filtered.length === 0 ? <div className="muted">No tasks</div> :
            filtered.map(t => (
              <div key={t.id} style={{ marginTop: 8 }} className="card">
                <TaskItem t={t} onToggle={toggle} onDelete={del} onEdit={startEdit} />
              </div>
            ))
        )}
      </div>
    </div>
  )
}