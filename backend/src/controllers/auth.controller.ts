import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import authService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;
    const result = await authService.register(name, email, password, role);
    res.status(201).json(result);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      message: error instanceof Error ? error.message : 'Registration failed' 
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ 
      message: error instanceof Error ? error.message : 'Login failed' 
    });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const user = await authService.verifyToken(token);
    res.json(user);
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ 
      message: error instanceof Error ? error.message : 'Invalid token' 
    });
  }
}; 