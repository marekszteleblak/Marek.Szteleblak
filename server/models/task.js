const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    date: Date,
    completed: { type: Boolean, default: false },
    category: String,
   
});

module.exports = mongoose.model('Task', taskSchema);
