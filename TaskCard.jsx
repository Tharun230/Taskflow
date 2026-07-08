const express = require('express');
const {
  getBoards,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
} = require('../controllers/boardController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/').get(getBoards).post(createBoard);
router.route('/:id').get(getBoardById).put(updateBoard).delete(deleteBoard);

module.exports = router;
