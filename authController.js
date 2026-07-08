const Task = require('../models/Task');
const Board = require('../models/Board');

// @route GET /api/boards/:boardId/tasks
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ board: req.params.boardId }).sort({ order: 1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// @route POST /api/boards/:boardId/tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description, columnId, priority } = req.body;
    const board = await Board.findById(req.params.boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });

    const count = await Task.countDocuments({ board: board._id, columnId });

    const task = await Task.create({
      board: board._id,
      columnId,
      title,
      description,
      priority,
      order: count,
      createdBy: req.user._id,
    });

    const io = req.app.get('io');
    io.to(board._id.toString()).emit('task:created', task);

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    Object.assign(task, req.body);
    await task.save();

    const io = req.app.get('io');
    io.to(task.board.toString()).emit('task:updated', task);

    res.json(task);
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.deleteOne();

    const io = req.app.get('io');
    io.to(task.board.toString()).emit('task:deleted', task._id);

    res.json({ message: 'Task removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
