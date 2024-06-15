const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    },
    question: {
        type: String,
        required: [true, 'Please provide a question'],
    },
    answer: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
