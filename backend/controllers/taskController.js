const taskModel = require('../models/taskModel');

exports.getTasks = (req, res) => {
  const tasks = taskModel.getAll();
  res.json(tasks);
};

exports.addTask = (req, res) => {
  const { title } = req.body;
  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'title is required' });
  }
  const t = taskModel.add(title.trim(), false);
  res.status(201).json(t);
};

exports.updateTask = (req, res) => {
  const id = req.params.id;
  const { completed, title } = req.body;

  // At least one field required
  if (typeof completed !== 'boolean' && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ error: 'completed or title required' });
  }

  const updated = taskModel.update(id, { completed, title });
  if (!updated) return res.status(404).json({ error: 'task not found' });

  res.json(updated);
};

exports.deleteTask = (req, res) => {
  const id = req.params.id;
  const ok = taskModel.delete(id);
  if (!ok) return res.status(404).json({ error: 'task not found' });
  res.json({ success: true });
};