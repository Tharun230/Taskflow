const Board = require('../models/Board');
const Task = require('../models/Task');

const defaultColumns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

// @route GET /api/boards
const getBoards = async (req, res, next) => {
  try {
    const boards = await Board.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    }).sort({ createdAt: -1 });
    res.json(boards);
  } catch (err) {
    next(err);
  }
};

// @route POST /api/boards
const createBoard = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const board = await Board.create({
      title,
      description,
      owner: req.user._id,
      members: [req.user._id],
      columns: defaultColumns,
    });

    res.status(201).json(board);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/boards/:id
const getBoardById = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: 'Board not found' });

    const isMember =
      board.owner.toString() === req.user._id.toString() ||
      board.members.some((m) => m.toString() === req.user._id.toString());

    if (!isMember) return res.status(403).json({ message: 'Access denied' });

    res.json(board);
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/boards/:id
const updateBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: 'Board not found' });
    if (board.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only the owner can update this board' });
    }

    board.title = req.body.title ?? board.title;
    board.description = req.body.description ?? board.description;
    await board.save();

    res.json(board);
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/boards/:id
const deleteBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: 'Board not found' });
    if (board.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only the owner can delete this board' });
    }

    await Task.deleteMany({ board: board._id });
    await board.deleteOne();

    res.json({ message: 'Board removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBoards, createBoard, getBoardById, updateBoard, deleteBoard };
