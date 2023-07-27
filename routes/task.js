import express from 'express';
import jsonWebToken from 'jsonwebtoken';
import Task from '../model/taskSchema.js';

const router = express.Router();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: 'Authentication token required' });

  jsonWebToken.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Create a new task
router.post('/task', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({ user: req.user.userId, title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Get all tasks
router.get('/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Update a task by ID
router.put('/tasks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete a task by ID
router.delete('/tasks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

export default router;