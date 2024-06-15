const Question = require('../models/Question');
const anthropicClient = require('../config/langchain');
const dotenv = require('dotenv');
const logger = require('../config/logger');
const { maxTokens } = require('../config/langchain');

dotenv.config();

const getAIAnswer = async (question) => {
    try {
        logger.info('Fetching AI response from Anthropic: %s', question);
        let response = await anthropicClient.invoke(question)
        console.log(response)
          // Check if response is in the expected format
          if (response && response.content) {
            return response.content;
          } else {
            throw new Error('Unexpected response format');
          }
    } catch (error) {
        logger.error('Error fetching AI response from Anthropic: %O', error);
        throw new Error('Error fetching AI response from Anthropic');
    }
};

exports.createQuestion = async (req, res) => {
    const { question } = req.body;
    try {
        const answer = await getAIAnswer(question);
        const newQuestion = new Question({ userId: req.user._id, question, answer });
        await newQuestion.save();
        logger.info('Question created successfully: %O', newQuestion);
        res.status(201).json(newQuestion);
    } catch (error) {
        logger.error('Error creating question: %O', error);
        res.status(500).json({ message: 'Error creating question', error });
    }
};

exports.getQuestionById = async (req, res) => {
    const questionId = req.params.questionId;
    try {
        const question = await Question.findById(questionId).populate('userId', 'username email');
        if (!question) {
            logger.warn('Question not found: %s', questionId);
            return res.status(404).json({ message: 'Question not found' });
        }
        logger.info('Question fetched successfully: %O', question);
        res.status(200).json(question);
    } catch (error) {
        logger.error('Error fetching question: %O', error);
        res.status(500).json({ message: 'Error fetching question', error });
    }
};

exports.getQuestionsByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const questions = await Question.find({ userId }).populate('userId', 'username email');
        logger.info('Questions fetched successfully for user: %s', userId);
        res.status(200).json(questions);
    } catch (error) {
        logger.error('Error fetching questions: %O', error);
        res.status(500).json({ message: 'Error fetching questions', error });
    }
};
