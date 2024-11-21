// utils/auth.ts

import jwt from 'jsonwebtoken';

type TokenPayload = {
  user_id: string;
  email: string;
};
