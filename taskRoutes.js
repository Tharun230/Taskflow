const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
    columnId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    order: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
