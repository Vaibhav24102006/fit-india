import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

// List of admin email addresses
const ADMIN_EMAILS = [
  'admin@fitindia.com',
  // Add more admin emails as needed
];

export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Check if the user's email is in the admin list
    if (!decodedToken.email || !ADMIN_EMAILS.includes(decodedToken.email)) {
      return res.status(403).json({ error: 'Not authorized as admin' });
    }

    // Add user info to request for use in routes
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
} 