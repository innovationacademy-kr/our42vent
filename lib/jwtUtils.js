import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import consoleLogger from './consoleLogger.js';
import { selectToken } from '../models/accessTokenTable.js';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

// access token 생성
export function accessSign(userId) {
  const payload = { id: userId };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// access token 유효성 검사
export function verifyAccess(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return {
      verified: true,
      id: decoded.id,
    };
  } catch (err) {
    consoleLogger.error('verifyAccess : verify error : ', err);
    return {
      verified: false,
      message: err.message,
    };
  }
}

// refresh token 생성
export function refreshSign(userId) {
  const payload = { id: userId };
  return jwt.sign(payload, secretKey, { expiresIn: '14d' });
}

// refresh token 유효성 검증 및 DB와 비교
export async function verifyRefresh(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    const { id } = decoded;

    // DB에서 저장된 토큰을 Select
    const storedToken = await selectToken(id);

    if (token.localeCompare(storedToken.content)) throw new Error('Token does not match!');

    return {
      verified: true,
      message: 'Refreshtoken Verify Success',
      id,
    };
  } catch (err) {
    consoleLogger.error('verifyRefresh : verify error : ', err);
    return {
      verified: false,
      message: err.message,
    };
  }
}