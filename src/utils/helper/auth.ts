// utils/auth.ts

import jwt from 'jsonwebtoken';

type TokenPayload = {
  user_id: string;
  email: string;
};

export const decryptToken = (token: string): TokenPayload | null => {
  console.log('token', token);
  try {
    // Decode the token without verifying to access the payload
    const decoded = jwt.decode(token) as TokenPayload | null;
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};
