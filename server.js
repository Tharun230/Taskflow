const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    columns: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Board', boardSchema);
