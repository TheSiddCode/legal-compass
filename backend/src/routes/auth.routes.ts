import { Router } from 'express';
import { body } from 'express-validator';
import { login, register, verifyToken } from '../controllers/auth.controller';

const router = Router();

// Validation middleware
const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['Lawyer', 'User']).withMessage('Role must be either Lawyer or User'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Routes
router.post('/signup', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/verify', verifyToken);

export default router; 