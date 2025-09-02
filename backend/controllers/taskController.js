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
  const { completed } = req.body;
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed boolean required' });
  }
  const updated = taskModel.updateStatus(id, completed);
  if (!updated) return res.status(404).json({ error: 'task not found' });
  res.json(updated);
};

exports.deleteTask = (req, res) => {
  const id = req.params.id;
  const ok = taskModel.delete(id);
  if (!ok) return res.status(404).json({ error: 'task not found' });
  res.json({ success: true });
};
