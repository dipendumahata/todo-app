const { v4: uuidv4 } = require('uuid');

// in-memory tasks array (per app lifetime)
let tasks = [
  { id: uuidv4(), title: 'Welcome task', completed: false }
];

module.exports = {
  getAll: () => tasks,
  add: (title, completed = false) => {
    const t = { id: uuidv4(), title, completed };
    tasks.push(t);
    return t;
  },
  updateStatus: (id, completed) => {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    tasks[idx].completed = completed;
    return tasks[idx];
  },
  delete: (id) => {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    tasks.splice(idx, 1);
    return true;
  }
};
