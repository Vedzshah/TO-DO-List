const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

let tasks = [];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const task = { ...req.body, id: tasks.length + 1 };
  tasks.push(task);
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
