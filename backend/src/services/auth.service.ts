import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

class AuthService {
  async register(name: string, email: string, password: string, role: 'Lawyer' | 'User') {
    try {
      console.log('Attempting to register user:', { name, email, role });
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists:', email);
        throw new Error('User already exists');
      }

      // Create new user
      const user = new User({
        name,
        email,
        password,
        role,
      });

      await user.save();
      console.log('User registered successfully:', { id: user.id, email: user.email });

      // Generate JWT token
      const token = this.generateToken(user);

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      console.log('Attempting login for user:', email);
      
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found:', email);
        throw new Error('Invalid email or password');
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      console.log('Password match result:', isMatch);
      
      if (!isMatch) {
        console.log('Invalid password for user:', email);
        throw new Error('Invalid email or password');
      }

      // Generate JWT token
      const token = this.generateToken(user);
      console.log('Login successful for user:', { id: user.id, email: user.email });

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async verifyToken(token: string) {
    try {
      console.log('Verifying token');
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        console.log('User not found for token verification');
        throw new Error('User not found');
      }

      console.log('Token verified for user:', { id: user.id, email: user.email });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new Error('Invalid token');
    }
  }

  private generateToken(user: IUser): string {
    try {
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );
      console.log('Generated token for user:', { id: user.id, email: user.email });
      return token;
    } catch (error) {
      console.error('Token generation error:', error);
      throw new Error('Failed to generate token');
    }
  }
}

export default new AuthService(); 