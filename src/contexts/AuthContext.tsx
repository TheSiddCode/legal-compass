import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Lawyer' | 'User';
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'Lawyer' | 'User') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => useContext(AuthContext);

export const useAuth = useAuthContext;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await fetch(`${API_URL}/api/auth/verify`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            localStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to login';
        
        try {
          // Try to parse the response as JSON
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If parsing fails, try to get the text
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch {
            // If all else fails, use the default message
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Store token and update user state
      localStorage.setItem('authToken', data.token);
      setUser(data.user);
      
      // Show success message and navigate
      toast.success('Login successful!');
      
      // Use setTimeout to ensure state updates before navigation
      setTimeout(() => {
        navigate('/');
      }, 100);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'Lawyer' | 'User') => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to signup';
        
        try {
          // Try to parse the response as JSON
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If parsing fails, try to get the text
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch {
            // If all else fails, use the default message
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      setUser(data.user);
      
      toast.success('Signup successful!');
      
      if (role === 'Lawyer') {
        navigate('/lawyer-profile');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    toast.info('Logged out successfully');
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
