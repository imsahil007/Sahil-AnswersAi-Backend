const express = require('express');
const { createQuestion, getQuestionById, getQuestionsByUserId } = require('../controllers/questionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: API for managing questions and answers
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "What is the chemical formula for water?"
 *     responses:
 *       201:
 *         description: Question created successfully
 *       500:
 *         description: Error creating question
 */
router.post('/questions', authMiddleware, createQuestion);

/**
 * @swagger
 * /questions/{questionId}:
 *   get:
 *     summary: Get a specific question by ID
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The question ID
 *     responses:
 *       200:
 *         description: Question fetched successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Error fetching question
 */
router.get('/questions/:questionId', authMiddleware, getQuestionById);

/**
 * @swagger
 * /users/{userId}/questions:
 *   get:
 *     summary: Get all questions asked by a specific user
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Questions fetched successfully
 *       500:
 *         description: Error fetching questions
 */
router.get('/users/:userId/questions', authMiddleware, getQuestionsByUserId);

module.exports = router;
