// Simple Express backend (MVC-ish) - junior dev style
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/profile', profileRoutes);

// simple ping
app.get('/', (req, res) => {
  res.json({ message: 'Backend running' });
});

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
