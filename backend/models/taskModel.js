const { v4: uuidv4 } = require('uuid');

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

  update: (id, fields) => {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;

    if (typeof fields.completed === 'boolean') {
      tasks[idx].completed = fields.completed;
    }
    if (typeof fields.title === 'string' && fields.title.trim() !== '') {
      tasks[idx].title = fields.title.trim();
    }

    return tasks[idx];
  },

  delete: (id) => {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    tasks.splice(idx, 1);
    return true;
  }
};